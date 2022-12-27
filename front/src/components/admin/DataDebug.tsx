import React from 'react'
import styled from 'styled-components'

interface DataDebugProps {
  data: unknown
}

const DataDebug: React.FC<DataDebugProps> = ({ data }) => {
  return (
    <Details className="drac-box drac-bg-black drac-rounded-lg drac-p-md drac-mt-md">
      <Summary>Data</Summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Details>
  )
}

const Details = styled.details``
const Summary = styled.summary`
  cursor: pointer;
`

export default DataDebug
