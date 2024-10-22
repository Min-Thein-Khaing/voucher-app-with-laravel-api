import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import VoucherDetailUi from '../components/VoucherDetailUi'

const VoucherDetailPage = () => {
  return (
    <div>
      <Breadcrumb currentPageName={"Voucher Detail"} links={[{ name: "Voucher Module", path: "/voucher" }]} />
      <VoucherDetailUi />
    </div>

  )
}

export default VoucherDetailPage