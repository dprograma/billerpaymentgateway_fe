import React from 'react'

type Props = {}

const VerifyPhoneEmail = (props: Props) => {
  const data = window.location.search
  return (
    <div><p>{data}</p></div>
    
  )
}

export default VerifyPhoneEmail