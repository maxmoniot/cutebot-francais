/**
 * Blocs Cutebot en français utilisant le simulateur robot
 */
//% weight=10 color=#0fbc11 icon="\uf207"
//% groups='["Moteurs", "LEDs", "Capteurs", "Servos"]'
namespace cuteBot {
    let _robot: robot.RobotDriver = null
    let _initialized = false
    
    function ensureRobot() {
        if (!_initialized) {
            // Auto-start the robot on first use
            robot.start(robot.elecfreaksCuteBot)
            _initialized = true
        }
        if (!_robot) {
            _robot = robot.RobotDriver.instance()
        }
    }
    
    /**
     * Unit of Ultrasound Module
     */
    export enum SonarUnit {
        //% block="cm"
        Centimeters,
        //% block="pouces"
        Inches
    }
    
    /**
     * Status List of Tracking Modules
     */
    export enum TrackingState {
        //% block="● ●" enumval=0
        L_R_line,
        //% block="◌ ●" enumval=1
        L_unline_R_line,
        //% block="● ◌" enumval=2
        L_line_R_unline,
        //% block="◌ ◌" enumval=3
        L_R_unline
    }
    
    export enum RGBLights {
        //% blockId="Right_RGB" block="Droite_RGB"
        RGB_L = 1,
        //% blockId="Left_RGB" block="Gauche_RGB"
        RGB_R = 0,
        //% blockId="ALL" block="TOUS"
        ALL = 3
    }
    
    export enum ServoList {
        //% block="S1"
        S1 = 0,
        //% block="S2"
        S2 = 1
    }
    
    /**
     * Régler la vitesse du moteur gauche et droit
     * @param lspeed vitesse roue gauche
     * @param rspeed vitesse roue droite
     */
    //% blockId=MotorRun block="Régler vitesse roue gauche %lspeed\\% |roue droite %rspeed\\%"
    //% lspeed.min=-100 lspeed.max=100
    //% rspeed.min=-100 rspeed.max=100
    //% weight=100
    //% group="Moteurs"
    export function motors(lspeed: number = 50, rspeed: number = 50): void {
        ensureRobot()
        // Utiliser motorTank du robot Microsoft
        robot.motorTank(lspeed, rspeed)
    }
    
    /**
     * Avancer en ligne droite à vitesse maximum
     */
    //% blockId=cutebot_forward block="Avancer en ligne droite à vitesse maximum"
    //% weight=90
    //% group="Moteurs"
    export function forward(): void {
        motors(80, 80)
    }
    
    /**
     * Reculer en ligne droite à vitesse maximum
     */
    //% blockId=cutebot_back block="Reculer en ligne droite à vitesse maximum"
    //% weight=85
    //% group="Moteurs"
    export function backforward(): void {
        motors(-80, -80)
    }
    
    /**
     * Tourner à gauche à vitesse maximum
     */
    //% blockId=cutebot_left block="Tourner à gauche à vitesse maximum"
    //% weight=80
    //% group="Moteurs"
    export function turnleft(): void {
        motors(0, 80)
    }
    
    /**
     * Tourner à droite à vitesse maximum
     */
    //% blockId=cutebot_right block="Tourner à droite à vitesse maximum"
    //% weight=75
    //% group="Moteurs"
    export function turnright(): void {
        motors(80, 0)
    }
    
    /**
     * Arrêter le robot immédiatement
     */
    //% blockId=cutebot_stopcar block="Arrêter le robot immédiatement"
    //% weight=70
    //% group="Moteurs"
    export function stopcar(): void {
        motors(0, 0)
    }
    
    /**
     * Régler les phares LED
     */
    //% block="Régler phares LED %light couleur $color"
    //% color.shadow="colorNumberPicker"
    //% weight=65
    //% group="LEDs"
    export function colorLight(light: RGBLights, color: number) {
        ensureRobot()
        // Utiliser setColor du robot Microsoft
        robot.setColor("general", color)
    }
    
    /**
     * Capteur ultrason HC-SR04
     */
    //% blockId=ultrasonic block="Capteur ultrason HC-SR04 unité %unit"
    //% weight=35
    //% group="Capteurs"
    export function ultrasonic(unit: SonarUnit, maxCmDistance = 500): number {
        ensureRobot()
        const distance = robot.obstacleDistance()
        
        switch (unit) {
            case SonarUnit.Centimeters:
                return Math.floor(distance)
            case SonarUnit.Inches:
                return Math.floor(distance * 0.3937)
            default:
                return distance
        }
    }
    
    /**
     * État du capteur de suivi de ligne
     */
    //% blockId=ringbitcar_tracking block="État capteur de ligne %state"
    //% weight=50
    //% group="Capteurs"
    export function tracking(state: TrackingState): boolean {
        ensureRobot()
        const lineState = robot.lineState()
        
        // Le système robot retourne un nombre avec bits:
        // bit 0 = outer-left, bit 1 = left, bit 2 = middle, bit 3 = right, bit 4 = outer-right
        // Pour cutebot: on utilise left (bit 1) et right (bit 3)
        
        const left = (lineState & (1 << 1)) ? 0 : 1  // Inversé: 1 = ligne détectée
        const right = (lineState & (1 << 3)) ? 0 : 1
        
        if (left == 0 && right == 0 && state == TrackingState.L_R_line) {
            return true
        } else if (left == 1 && right == 0 && state == TrackingState.L_unline_R_line) {
            return true
        } else if (left == 0 && right == 1 && state == TrackingState.L_line_R_unline) {
            return true
        } else if (left == 1 && right == 1 && state == TrackingState.L_R_unline) {
            return true
        }
        return false
    }
    
    /**
     * Régler l'angle du servo
     */
    //% blockId=cutebot_servo block="Régler servo %servo angle %angle °"
    //% angle.shadow="protractorPicker"
    //% weight=30
    //% group="Servos"
    export function setServo(servo: ServoList, angle: number = 180): void {
        ensureRobot()
        // Convertir angle (0-180) en opening (0-100)
        const opening = (angle / 180) * 100
        robot.armOpen(servo, opening)
    }
}
