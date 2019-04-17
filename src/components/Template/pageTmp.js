import React, { PureComponent } from 'react'
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  // Menu,
  // Dropdown,
  Row,
  Col,
  Icon,
  InputNumber
} from 'antd'
import StandardTable from '@/components/StandardTable'
import cx from 'classname'
// import { exportXls } from '@/services/commonApi'
// import exportDownLoad from '@/util/exportDownload'
import moment from 'moment'
import styles from './pageTmp.less'

const { RangePicker } = DatePicker
const SelectOption = Select.Option
const FormItem = Form.Item

class pageTmp extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      expandForm: false,
      modalVisible: false,
      tableWidth: 0, //表格宽度
      tableHeight: 0, //表格高度
    }
  }
  //分页查询
  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter)
  }
  // 重置
  resetFun() {
    this.props.form.resetFields()
    this.props.onReset()
  }
  // 筛选模态框取消
  handleCancel = () => {
    this.setState({
      modalVisible: false
    })
  }
  // 筛选模态框确认
  handleOk = () => {
    this.props.form.validateFields((errors, values) => {
      this.props.onFilter(values)
      this.setState({
        modalVisible: false
      })
    })
  }
  // 渲染模态框内容
  renderFormItem(filters, showLength) {
    let formContent = []
    if (Array.isArray(filters)) {
      showLength = showLength || filters.length
      const { getFieldDecorator } = this.props.form
      filters.map((item) => {
        if (formContent.length < showLength) {
          switch (item.type) {
            case 'Input':
              formContent.push(
                <Col md={8} sm={24}>
                  <FormItem
                    className="filter"
                    label={item.label}
                  >
                    {getFieldDecorator(item.value, {
                      rules: [],
                      initialValue: ''
                    })(
                      <Input style={{ width: '100%' }} placeholder='请输入' />
                    )}
                  </FormItem>
                </Col>
              )
              break
            case 'Select':
              formContent.push(
                <Col md={8} sm={24}>
                  <FormItem
                    className="filter"
                    label={item.label}
                  >
                    {getFieldDecorator(item.value, {
                      rules: [],
                      initialValue: item.statusList[0].value
                    })(
                      <Select style={{ width: '100%' }} >
                        {
                          item.statusList.map((statusItem, index) => (
                            <SelectOption value={statusItem.value} key={index}>{statusItem.label}</SelectOption>
                          ))
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>
              )
              break
            case 'RangePicker':
              formContent.push(
                <Col md={8} sm={24}>
                  <FormItem
                    className="filter"
                    label={item.label}
                  >
                    {getFieldDecorator(item.value, {})(
                      <RangePicker
                        style={{ width: '100%' }}
                      />
                    )}
                  </FormItem>
                </Col>
              )
              break
            case 'InputNumber':
              formContent.push(
                <Col md={8} sm={24}>
                  <FormItem
                    className="filter"
                    label={item.label}
                  >
                    {getFieldDecorator(item.value, {})(
                      <InputNumber style={{ width: '100%' }} />
                    )}
                  </FormItem>
                </Col>
              )
              break
            default:
              break;
          }
        } else {
          return null
        }
        return item
      })
    }
    return formContent
  }
  // 导出Xls
  // handleExportXls(type) {
  //   const { exportXlsApi } = this.props
  //   if (exportXlsApi) {
  //     if (type === 'allPage') {
  //       // 导出全部页
  //       let newParam = {}
  //       // 过滤limit和page
  //       Object.keys(exportXlsApi.param).map((key) => {
  //         if (key !== 'limit' && key !== 'page') {
  //           newParam[key] = exportXlsApi.param[key]
  //         }
  //       })
  //       exportXls(exportXlsApi.url, newParam).then((res) => {
  //         let fileName = exportXlsApi.fileName
  //         fileName = this.formatFileName(fileName)
  //         exportDownLoad(res, fileName)
  //       })
  //     } else {
  //       // 导出当前页
  //       let newParam = exportXlsApi.param || {}
  //       newParam.limit = this.props.pageSize || 10
  //       newParam.page = this.props.currentPage
  //       exportXls(exportXlsApi.url, newParam).then((res) => {
  //         let fileName = exportXlsApi.fileName
  //         fileName = this.formatFileName(fileName)
  //         exportDownLoad(res, fileName)
  //         delete exportXlsApi.param.limit
  //         delete exportXlsApi.param.page
  //       })
  //     }
  //   }
  // }
  // 格式化文件名
  formatFileName(filename) {
    if (filename) {
      let name = filename.split('.')[0]
      let format = filename.split('.')[1]
      return `${name}${moment(new Date()).format('YYYYMMDDHHmmss')}.${format}`
    } else {
      return filename
    }
  }
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };
  renderSimpleForm() {
    const {
      filters = []
    } = this.props;
    if (filters.length <= 0) {
      return []
    }
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 12, xl: 24 }}>
          {
            this.renderFormItem(filters, 2)
          }
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" onClick={() => this.handleOk()}>
                筛选
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={() => this.resetFun()}>
                重置
              </Button>
              {
                filters.length > 2 && (
                  <a href="javascript:;" style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                    展开 <Icon type="down" />
                  </a>
                )
              }
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
  renderAdvancedForm() {
    const {
      filters = []
    } = this.props;
    return (
      <Form layout="inline">
        <Row gutter={{ md: 8, lg: 12, xl: 24 }}>
          {
            this.renderFormItem(filters)
          }
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" onClick={() => this.handleOk()}>
                筛选
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={() => this.resetFun()}>
                重置
              </Button>
              <a href="javascript:;" style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="up" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {

    const {
      data,
      loading,
      columns,
      currentPage,
      title,
      noMargin,
      pagination,
      //exportXls = true,
      //filters = [],
      rowSelection = null,
      rowKey,
      addButton,
      scroll = {}
    } = this.props
    scroll.x = scroll.x || 1920
    scroll.y = scroll.y || 600
    // const menu = (
    //   <Menu>
    //     <Menu.Item>
    //       <div onClick={() => this.handleExportXls('currentPage')}>当前页导出</div>
    //     </Menu.Item>
    //     <Menu.Item>
    //       <div onClick={() => this.handleExportXls('allPage')}>全部页导出</div>
    //     </Menu.Item>
    //   </Menu>
    // );
    return (
      <div className={cx(styles.tableTmp_wrap, noMargin && styles.nomargin)} ref={(tableWidth) => { this.tableWidth = tableWidth }}>
        <div className={cx(styles.tableTmp_title, (!title && styles.hideTitle))}>
          {
            title && <span>{title}</span>
          }
          <div className={styles.tableTmp_title_right}>
            {
              addButton && <Button icon="plus" type='primary' onClick={() => addButton.onAdd()} >{addButton.text}</Button>
            }
            {/* {
              exportXls && (
                <Dropdown overlay={menu} placement="bottomRight">
                  <Button type='primary' icon='export' >导出</Button>
                </Dropdown>
              )
            } */}
          </div>
        </div>
        <div className={styles.tableTmp_content}>
          <div>
            <div className={cx("operation_wrap", !this.props.children && "marTop")}>
              <div className={cx("operation_left", !this.props.children && "nomargin")}>
                {this.props.children}
              </div>
            </div>
            <div className={styles.tableListForm}>
              {
                this.renderForm()
              }
            </div>
          </div>
          <div className={styles.tb_wrap}>
            <StandardTable
              //scroll={scroll}
              rowKey={rowKey}
              rowSelection={rowSelection}
              loading={loading}
              data={data}
              columns={columns}
              onChange={this.handleTableChange}
              currentPage={currentPage}
              paginations={pagination}
            />
          </div>
        </div>
      </div>
    )
  }

}

const pageTmpForm = Form.create()(pageTmp)

export default pageTmpForm