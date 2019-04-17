import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import PageTmp from '@/components/Template/pageTmp'

class listTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      param: {},
      loading: false,
      tbData: [],
      pageSize: 10, //一页显示10数据  *
      currentPage: 1, //默认显示第一页  *
    }
  }
  handleTableChange = () => {

  }
  handleFilter = () => {

  }
  handleResetFun = () => {

  }
  render() {
    const filters = []
    const columns = [];
    return (
      <PageHeaderWrapper>
        <PageTmp
          title={this.props.title}
          loading={this.state.loading}
          data={this.state.tbData}
          columns={columns}
          onChange={this.handleTableChange}
          currentPage={this.state.currentPage}

          filters={filters}
          onFilter={this.handleFilter}
          onReset={this.handleResetFun}
        />
      </PageHeaderWrapper>
    )
  }
}

export default listTemplate
