/**
 * Simulator support for Cutebot
 * Based on microsoft/pxt-robot code
 */

namespace cuteBot.sim {
    /**
     * Sensors bitmask (from protocol)
     */
    export enum Sensors {
        None = 0,
        LineDetector = 1 << 0,
        Sonar = 1 << 1,
    }

    /**
     * Robot assists bitmask (from protocol)
     */
    export enum RobotAssist {
        LineFollowing = 1 << 0,
        Speed = 1 << 1,
        Display = 2 << 1,
    }

    /**
     * Simulator line detectors
     */
    export class SimLineDetectors {
        current: number[] = [-1, -1]
        
        constructor() {}
        
        lineState(): number[] {
            return this.current.slice()
        }
    }

    /**
     * Simulator sonar
     */
    export class SimSonar {
        current: number = -1
        
        constructor() {}
        
        distance(): number {
            return this.current
        }
    }

    /**
     * Message types for simulator communication (matching protocol.ts)
     */
    export interface RobotSimStateMessage {
        type: "state"
        id: string
        deviceId: number
        productId: number
        motorTurnRatio: number
        motorSpeed: number
        motorLeft: number
        motorRight: number
        armAperture: number
        color: number
        assists: RobotAssist
        sensors: Sensors
    }

    export interface RobotSensorsMessage {
        type: "sensors"
        id: string
        deviceId: number
        lineDetectors: number[]
        obstacleDistance: number
    }

    export type RobotSimMessage = RobotSimStateMessage | RobotSensorsMessage

    // Simulator state
    let simLineDetectors: SimLineDetectors
    let simSonar: SimSonar
    let simId: string
    let isSimMode = false
    let sensorsUsed = Sensors.None

    /**
     * Initialize simulator mode
     */
    //% shim=TD_NOOP
    export function initSim() {
        simId = Math.random() + ""
        simLineDetectors = new SimLineDetectors()
        simSonar = new SimSonar()
        isSimMode = true
        control.simmessages.onReceived("robot", handleSimMessage)
    }

    /**
     * Check if in simulator mode
     */
    export function isSimulator(): boolean {
        return isSimMode
    }

    /**
     * Mark sensors as used
     */
    export function useSensor(sensor: Sensors) {
        sensorsUsed |= sensor
    }

    /**
     * Send state to simulator (matching protocol format)
     */
    //% shim=TD_NOOP
    export function sendState(
        leftMotor: number,
        rightMotor: number,
        headlightColor: number
    ) {
        if (!isSimMode) return
        
        const msg: RobotSimStateMessage = {
            type: "state",
            id: simId,
            deviceId: control.deviceSerialNumber(),
            productId: 0x3818d146, // Cutebot product ID
            motorTurnRatio: 0,
            motorSpeed: (leftMotor + rightMotor) / 2,
            motorLeft: leftMotor,
            motorRight: rightMotor,
            armAperture: 0,
            color: headlightColor,
            assists: RobotAssist.Speed | RobotAssist.Display,
            sensors: sensorsUsed
        }
        
        control.simmessages.send(
            "robot",
            Buffer.fromUTF8(JSON.stringify(msg)),
            false
        )
    }

    /**
     * Handle messages from simulator
     */
    function handleSimMessage(b: Buffer) {
        const s = b.toString()
        const msg = JSON.parse(s) as RobotSimMessage
        
        if (msg && msg.type === "sensors") {
            const sensors = msg as RobotSensorsMessage
            
            if (sensors.deviceId !== control.deviceSerialNumber() || sensors.id !== simId)
                return
            
            if (Array.isArray(sensors.lineDetectors)) {
                // Le simulateur envoie 5 capteurs, nous n'utilisons que left et right
                simLineDetectors.current = [
                    sensors.lineDetectors[1], // left
                    sensors.lineDetectors[3]  // right
                ]
            }
            
            if (!isNaN(sensors.obstacleDistance)) {
                simSonar.current = sensors.obstacleDistance
            }
        }
    }

    /**
     * Get simulator line detector state (left, right)
     */
    export function getLineState(): number[] {
        if (isSimMode && simLineDetectors) {
            return simLineDetectors.lineState()
        }
        return [-1, -1]
    }

    /**
     * Get simulator sonar distance
     */
    export function getSonarDistance(): number {
        if (isSimMode && simSonar) {
            return simSonar.distance()
        }
        return -1
    }
}
