import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (nextProps.selectedRows) {
      if (nextProps.selectedRows.length === 0) {
        const needTotalList = initTotalList(nextProps.columns);
        return {
          selectedRowKeys: [],
          needTotalList,
        };
      }
    }

    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }
    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    //const { selectedRowKeys, needTotalList } = this.state;
    const {
      data,
      loading,
      columns,
      rowKey,
      currentPage,
      //scroll,
      paginations,
      rowSelection
    } = this.props
    const pagination = {
      current: currentPage,
      pageSize: data.size || 10,
      total: data.totalPages * data.size || 0
    }

    let paginationProps = false
    if (paginations !== false) {
      paginationProps = {
        showSizeChanger: true,
        showQuickJumper: true,
        ...pagination,
      }
    }
    return (
      <div className={styles.standardTable}>
        <Table
          className="commontb"
          //scroll={scroll}
          loading={loading}
          rowSelection={rowSelection ? rowSelection : null}
          rowKey={rowKey || 'id'}
          dataSource={data.content || data}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
        {
          paginations !== false && data.totalElements !== 0 && data.totalElements !== undefined ?
            <div className={styles.total}>总共 {data.totalElements} 条信息</div>
            :
            ''
        }
      </div>
    )
  }

}

export default StandardTable