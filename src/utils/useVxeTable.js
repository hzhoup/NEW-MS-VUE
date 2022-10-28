import 'xe-utils'
import { Column, Icon, Table, VXETable } from 'vxe-table'
import zhCN from 'vxe-table/es/locale/lang/zh-CN'

VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
})

export function useVxeTable(app) {
  app.use(Icon).use(Column).use(Table)
}
