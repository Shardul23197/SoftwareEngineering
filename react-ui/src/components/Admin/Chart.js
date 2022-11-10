import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
// import { DocsCallout } from './components'

const Charts = () => {
  const random = () => Math.round(Math.random() * 100)

  return (
    <CRow>
      <CCol xs={12}>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Bar Chart</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'GitHub Commits',
                    backgroundColor: '#f87979',
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </CCol>
      
      
    </CRow>
  )
}

export default Charts
