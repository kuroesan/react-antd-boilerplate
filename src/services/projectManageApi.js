import request from '@/utils/request';
import formatParam from '@/utils/formatParam'

// 创建项目
export async function saveProject(params) {
  return request('/api/project/save', {
    method: 'POST',
    body: {
      ...params
    },
  });
}


// 更新项目
export async function updateProject(params) {
  return request('/api/project/update', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

// 创建数据库
export async function saveDataBase(params) {
  return request('/api/data-base/save', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

// 更新数据库
export async function updateDataBase(params) {
  return request('/api/data-base/update', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

// 获取数据库表
export async function getTableList(params) {
  return request(`/api/data-table/listTable?${formatParam(params)}`)
}

// 创建数据表
export async function saveDataTable(params) {
  return request('/api/data-table/save', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

// 删除数据表
export async function deleteDataTable(params) {
  return request('/api/data-table/delete', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

// 保存数据库表字段
export async function saveDataColumn(params) {
  return request('/api/data-column/save', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

// 删除数据库表字段
export async function deleteDataColumn(params) {
  return request('/api/data-column/delete', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

// 更新数据库表字段
export async function updateDataColumn(params) {
  return request('/api/data-column/update', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

// 初始化数据库
export async function initDataBase(params) {
  return request('/api/data-base/init', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

// 初始化项目
export async function initProject(params) {
  return request('/api/project/init', {
    method: 'POST',
    body: {
      ...params
    },
  });
}
