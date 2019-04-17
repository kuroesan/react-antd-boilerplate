import { observable, action } from 'mobx'

class ProjectManage {
  @observable currentStep = localStorage.getItem('currentStep') ? Number(localStorage.getItem('currentStep')) : 0;
  @observable createInfo = localStorage.getItem('createInfo') ? JSON.parse(localStorage.getItem('createInfo')) : {};
  @observable frontCurrentStep = localStorage.getItem('frontCurrentStep') ? Number(localStorage.getItem('frontCurrentStep')) : 0;
  @observable frontCreateInfo = localStorage.getItem('frontCreateInfo') ? JSON.parse(localStorage.getItem('frontCreateInfo')) : {};

  @action
  changeCurrentStep = (currentStep, createInfo) => {
    localStorage.setItem('createInfo', JSON.stringify(createInfo))
    localStorage.setItem('currentStep', currentStep)
    this.createInfo = this.createInfo
    this.currentStep = currentStep
  }

  @action
  clearCreateInfo = () => {
    localStorage.removeItem('currentStep')
    localStorage.removeItem('createInfo')
    this.currentStep = 0
    this.createInfo = null
  }
}

export default new ProjectManage()