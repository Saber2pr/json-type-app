import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  position: relative;
`

export const Editor = styled.div`
  width: 50%;
`

const BtnStyle = css`
  z-index: 10;
  background-color: white;
  padding: 2px 4px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`

export const LeftBtn = styled.div`
  position: absolute;
  right: calc(50% + 20px);
  top: 6px;
  ${BtnStyle}
`

export const RightBtn = styled.div`
  position: absolute;
  right: 20px;
  top: 6px;
  ${BtnStyle}
`