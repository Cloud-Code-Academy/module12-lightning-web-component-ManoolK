import { LightningElement } from 'lwc';
const devFundamentalsWeight = 0.23;
const processAutomationWeight = 0.3;
const userInterfaceWeight = 0.25;
const testDebugDeployWeight = 0.22;
const passingScore = 68;

export default class PlatformDevCertCalculator extends LightningElement {
    
    maxFieldValue = 100;
    isFieldValueTooHigh = false;
    devFundamentalsScore = 50;
    processAutomationScore = 50;
    userInterfaceScore = 50;
    testDebugDeployScore = 50;
    certificationScore = 50;
    numberOfQuestions = 60;

    showResources = false;
    passExam = false;
    attemptHistory = [];
    currentHistoryId = 0;

    get scoreClass() { 
        return this.passExam ? 'green-text' : 'red-text';
    }

    handleChange(event) {
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
        this.valudateFieldValues();
    }

    calculateScore() {
        if (!this.isFieldValueTooHigh) {
            let devFundWeightedScore = this.devFundamentalsScore * devFundamentalsWeight;
            let procAutomWeightedScore = this.processAutomationScore * processAutomationWeight;
            let userIntWeightedScore = this.userInterfaceScore * userInterfaceWeight;
            let testDebWeightedScore = this.testDebugDeployScore * testDebugDeployWeight;
            this.certificationScore = Math.round(devFundWeightedScore + procAutomWeightedScore + userIntWeightedScore + testDebWeightedScore);
            this.showResourcesIfFailed();
            this.addAttemptHistory(this.certificationScore);
        }
    }

    showResourcesIfFailed() {
        if (this.certificationScore < passingScore) {
            this.showResources = true;
        } else {
            this.showResources = false;
        }
        this.passExam = !this.showResources;
    }

    addAttemptHistory(Score) {
        this.currentHistoryId++;
        const attempt = {
            Id: this.currentHistoryId,
            Score
        };
        this.attemptHistory = [...this.attemptHistory, attempt];
    }

    deleteAttemptHandler(event) {
        let attemptId = event.detail;
        this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);
    }

    connectedCallback() {
        this.currentHistoryId = this.attemptHistory.length;
    }

    valudateFieldValues() {
        if (this.devFundamentalsScore > this.maxFieldValue ||
            this.processAutomationScore > this.maxFieldValue ||
            this.userInterfaceScore > this.maxFieldValue ||
            this.testDebugDeployScore > this.maxFieldValue
        ) {
            this.isFieldValueTooHigh = true;
        } else {
            this.isFieldValueTooHigh = false;
        }
    }
}