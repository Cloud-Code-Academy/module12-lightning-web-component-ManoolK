import { LightningElement } from 'lwc';
const devFundamentalsWeight = 0.23;
const processAutomationWeight = 0.3;
const userInterfaceWeight = 0.25;
const testDebugDeployWeight = 0.22;
const passingScore = 68;

export default class PlatformDevCertCalculator extends LightningElement {
    
    maxFieldValue = 100;
    devFundamentalsScore = 50;
    processAutomationScore = 50;
    userInterfaceScore = 50;
    testDebugDeployScore = 50;
    certificationScore = 90;

    showResources = false;
    passExam = false;
    attemptHistory = [
        {Id: 1, Score: 50}, 
        {Id: 2, Score: 60}, 
        {Id: 3, Score: 70}
    ];

    handleChange(event) {
        // TODO: Add Validity checking
        let value = Number(event.target.value);
        switch (event.target.name) {
            case 'devFundamentals':
                this.devFundamentalsScore = value;
                break;
            case 'processAutomation':
                this.processAutomationScore = value;
                break;
            case 'userInterface':
                this.userInterfaceScore = value;
                break;
            case 'testDebugDeploy':
                this.testDebugDeployScore = value;
                break;
        }
    }

    calculateScore() {
        let devFundWeightedScore = this.devFundamentalsScore * devFundamentalsWeight;
        let procAutomWeightedScore = this.processAutomationScore * processAutomationWeight;
        let userIntWeightedScore = this.userInterfaceScore * userInterfaceWeight;
        let testDebWeightedScore = this.testDebugDeployScore * testDebugDeployWeight;
        this.certificationScore = devFundWeightedScore + procAutomWeightedScore + userIntWeightedScore + testDebWeightedScore;
        this.showResourcesIfFailed();
        this.addAttemptHistory();
    }

    showResourcesIfFailed() {
        if (this.certificationScore < passingScore) {
            this.showResources = true;
        } else {
            this.showResources = false;
            this.passExam = true;
        }
    }

    addAttemptHistory() {
        this.attemptHistory.push(
            {
                Id: 4,
                Score: this.certificationScore
            }
        );
    }
}