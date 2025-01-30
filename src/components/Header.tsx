import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  height: 64px;
  background: #1e2233;
  display: flex;
  align-items: center;
  span{
    color: white;
    font-size: 24px;
    font-weight: 600;
    margin-left: 20px;
  }
`;

const Header = () => {
    return (
        <StyledContainer>
            <span>Zenskar</span>
        </StyledContainer>
    )
}

export default Header;