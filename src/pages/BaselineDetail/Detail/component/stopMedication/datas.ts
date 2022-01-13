export const stopDatas=[
  {
    name:'最后一次用药日期：',
    keys:'last_medicine_date',
    id:1,
    types:'date',
  },
  {
    name:'停药原因：',
    keys:'reason_id',
    id:2,
    types:'radio',
    children:[
      {
        name:'1 不良反应，医生判定无法继续用药',
        id:3,
        value:1,
      },
      {
        name:'2 伴发其它疾病，医生判定无法继续,请在“备注”处说明',
        id:4,
        value:2,
      },
      {
        name:'3 医生判定疗效不佳',
        id:5,
        value:3,
      },
      {
        name:'4 疾病痊愈，提前结束治疗',
        id:6,
        value:4,
      },
      {
        name:'5 失访',
        id:7,
        value:5,
      },
      {
        name:'6  其他，请在“备注”处说明',
        id:8,
        value:6,
        types:'textArea',
        children:{
          keys:'reason_other'
        }
      },
    ]
  },
]