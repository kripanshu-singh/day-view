import styled from "styled-components";
import { Tooltip } from "antd";
import me from "../assets/me.gif";
const StyledContainer = styled.div`
  width: 100%;
  height: 54px;
  min-height: 54px;
  background: #1e2233;
  display: flex;
  align-items: center;
  span {
    color: white;
    font-size: 24px;
    font-weight: 600;
    margin-left: 20px;
    flex: 1;
  }
  .link {
    cursor: pointer;
  }
`;

const StyledImage = styled.img`
  margin-right: 24px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid white;
`;

const Header = () => {
  return (
    <StyledContainer>
      <span>Zenskar</span>
      <a
        className="link"
        href="https://kripanshu-singh.vercel.app/"
        target="blank"
      >
        <Tooltip
          title="About me"
          color="#ececec"
          overlayInnerStyle={{ color: "black", border: "1px solid #a4a4a4" }}
          placement="bottom"
        >
          <StyledImage width={30} height={30} src={me} />
        </Tooltip>
      </a>
    </StyledContainer>
  );
};

export default Header;
