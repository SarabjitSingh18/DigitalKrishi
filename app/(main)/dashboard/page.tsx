import DashboardPageServices from '@/components/dashboardPage/DashBoardServices'
import HighDemandCrops from '@/components/dashboardPage/HighDemandCrop'
import Suggestions from '@/components/dashboardPage/Suggestions'
import React from 'react'

const page = () => {
  return (
    <>
    <Suggestions/>
    <DashboardPageServices/>
    <HighDemandCrops/>
    </>
  )
}

export default page
