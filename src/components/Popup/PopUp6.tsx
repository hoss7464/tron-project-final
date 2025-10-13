import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/actions/notifSlice";
import { useFetchData } from "../../contexts/FetchDataContext";
import PopUp from "./PopUp";
import {
  Popup6Container,
  Popup6HeaderWrapper,
  Popup2HeaderWrapper,
  Popup2Header,
  Popup6ContentWrapper,
  Popup2NameItemWrapper,
  Popup2NameWrapper,
  Popup2Name,
  Popup2ItemWrapper,
  Popup2Item,
  Popup2ImgWrapper,
  Popup6Icon,
  PopUp6Wrapper1,
  PopUp6CopyIconWrapper,
  PopUp6CopyIcon,
  Popup6TextWrapper,
  Popup6Text,
} from "./PopUpElements";
import {
  LegacyCardIconWrapper1,
  LegacyCardIconWrapper2,
  LegacyCardIconWrapper3,
} from "../../pages/mainPage/LegacySection/LegacyElements";

const PopUp6: React.FC = () => {
  const dispatch = useDispatch();
  const { resourceData } = useFetchData();
  const handleCopy = (text?: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      dispatch(
        showNotification({
          name: "copy-notif",
          message: "Copied to clipboard",
          severity: "success",
        })
      );
    }
  };
  return (
    <>
      <PopUp>
        <Popup6Container>
          <Popup6HeaderWrapper>
            <Popup2HeaderWrapper>
              <Popup2Header>Authorization</Popup2Header>
            </Popup2HeaderWrapper>
            <Popup2ImgWrapper>
              <LegacyCardIconWrapper1>
                <LegacyCardIconWrapper2>
                  <LegacyCardIconWrapper3>
                    <Popup6Icon />
                  </LegacyCardIconWrapper3>
                </LegacyCardIconWrapper2>
              </LegacyCardIconWrapper1>
            </Popup2ImgWrapper>
          </Popup6HeaderWrapper>

          <Popup6ContentWrapper>
            <Popup2NameItemWrapper>
              <PopUp6Wrapper1>
                <Popup2NameWrapper>
                  <Popup2Name style={{ fontWeight: "700" }}>
                    Permission Name:
                  </Popup2Name>
                </Popup2NameWrapper>
                <Popup2ItemWrapper>
                  <Popup2Item style={{ marginTop: "0.5rem" }}>
                    TronMax.io
                  </Popup2Item>
                </Popup2ItemWrapper>
              </PopUp6Wrapper1>
              <PopUp6CopyIconWrapper onClick={() => handleCopy("TronMax.io")}>
                <PopUp6CopyIcon />
              </PopUp6CopyIconWrapper>
            </Popup2NameItemWrapper>
          </Popup6ContentWrapper>

          <Popup6ContentWrapper>
            <Popup2NameItemWrapper
              style={{
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: "1rem",
              }}
            >
              <PopUp6Wrapper1>
                <Popup2NameWrapper>
                  <Popup2Name style={{ fontWeight: "700" }}>
                    Authorization Address:
                  </Popup2Name>
                </Popup2NameWrapper>
                <Popup2ItemWrapper>
                  <Popup2Item style={{ marginTop: "0.5rem" }}>
                    {resourceData?.data.DappAddress}
                  </Popup2Item>
                </Popup2ItemWrapper>
              </PopUp6Wrapper1>
              <PopUp6CopyIconWrapper
                onClick={() => handleCopy(resourceData?.data.DappAddress)}
              >
                <PopUp6CopyIcon />
              </PopUp6CopyIconWrapper>
            </Popup2NameItemWrapper>
          </Popup6ContentWrapper>

          <Popup6ContentWrapper>
            <Popup2NameItemWrapper
              style={{
                alignItems: "flex-start",
                flexDirection: "column",
                marginTop: "1rem",
              }}
            >
              <Popup2NameWrapper>
                <Popup2Name style={{ fontWeight: "700" }}>
                  Operation(s):
                </Popup2Name>
              </Popup2NameWrapper>
              <Popup6TextWrapper>
                <Popup6Text>Delegate Resources(Required)</Popup6Text>
              </Popup6TextWrapper>
              <Popup6TextWrapper>
                <Popup6Text>Reclaim Resources(Required)</Popup6Text>
              </Popup6TextWrapper>

              <Popup6TextWrapper style={{ backgroundColor: "#430E00" }}>
                <Popup6Text>Vote claim</Popup6Text>
              </Popup6TextWrapper>
              <Popup6TextWrapper style={{ backgroundColor: "#430E00" }}>
                <Popup6Text>Voting</Popup6Text>
              </Popup6TextWrapper>
              <Popup6TextWrapper style={{ backgroundColor: "#430E00" }}>
                <Popup6Text>Rewards TRX stake(2.0)</Popup6Text>
              </Popup6TextWrapper>
            </Popup2NameItemWrapper>
          </Popup6ContentWrapper>

          <Popup6ContentWrapper>
            <Popup2NameItemWrapper
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginTop: "1rem",
              }}
            >
              <PopUp6Wrapper1 style={{ marginRight: "2rem" }}>
                <Popup2NameWrapper>
                  <Popup2Name style={{ fontWeight: "700" }}>
                    Threshold:
                  </Popup2Name>
                </Popup2NameWrapper>
                <Popup6TextWrapper>
                  <Popup6Text>1</Popup6Text>
                </Popup6TextWrapper>
              </PopUp6Wrapper1>

              <PopUp6Wrapper1>
                <Popup2NameWrapper>
                  <Popup2Name style={{ fontWeight: "700" }}>weight:</Popup2Name>
                </Popup2NameWrapper>
                <Popup6TextWrapper>
                  <Popup6Text>1</Popup6Text>
                </Popup6TextWrapper>
              </PopUp6Wrapper1>
            </Popup2NameItemWrapper>
          </Popup6ContentWrapper>
        </Popup6Container>
      </PopUp>
    </>
  );
};

export default React.memo(PopUp6);
