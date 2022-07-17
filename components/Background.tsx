import styled from 'styled-components'

const Background = () => {
  return <BackgroundComponent />
}

const BackgroundComponent = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: black url(https://apod.nasa.gov/apod/image/2207/STScI-WebbSouthernRing.jpg) no-repeat center center fixed;
  background-size: cover;
`

export default Background
