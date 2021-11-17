import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { stockContext } from "./App";
import "./Detail.scss";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

let Box = styled.div`
  padding: 20px;
`;

let Title = styled.h4`
  font-size: 25px;
  color: ${(props) => props.color};
`;

// class Detail2 extends React.Component{
//   componentDidMount(){
//     //컴포넌트 생성될 때
//   }

//   componentWillUnmount(){
//     // 컴포넌트 소멸할 때
//   }
// }

function Detail(props) {
  // useEffect(() => {
  //   async function fetchResult() {
  //     let result = await axios.get(
  //       "https://codingapple1.github.io/shop/data2.json"
  //     );
  //     props.shoesChange([...props.shoes, ...result.data]);
  //   }
  //   console.log(props.shoes);
  //   fetchResult();
  // }, []);

  let stock = useContext(stockContext);
  // import해온 context 범위의 state 사용 가능해짐

  console.log(props.shoes);

  let [alert, alertChange] = useState(true);
  let [inputData, inputDataChange] = useState("");

  // 컴포넌트가 mount 되었을때, update 될때 특정 코드 실행
  // use Effect 는 여러개 생성 가능 대신 먼저 적힌 코드부터 실행
  // use Effect 콜백함수 뒤에 인자로 []를 사용하여 안에 특정 state를 집어넣을 수 있다.
  // 즉 []는 state 조건을 뜻하고 해당 []가 비어있으면 조건에 맞는값이 없으므로
  // 해당 useEffect는 실행되지 않는다. = 해당 컴포넌트가 처음 로드될때만 실행됨
  // [] 내부에 state 여러개 추가 가능 ex) [state1, state2...]
  useEffect(() => {
    let timer = setTimeout(() => {
      alertChange(false);
    }, 2000);

    console.log("hello");

    // unmount 될때
    return () => {
      clearTimeout(timer);
    };
    // settimeout은 해당 초가 지나기 전에 사용자에 의해 페이지 변경이 일어나면
    // 버그가 발생할 수 있어 실행 후 제거해주는 것이 좋다. = clearTimeout
  }, []);

  let history = useHistory();
  let { id } = useParams();
  // useParams 반환값은 객체 그 안에 url의 모든 파라미터 담겨있음
  // 그래서 destructuring 을 사용해 변수에 담아줌

  let selectItem = props.shoes.find((i) => {
    return i.id == id;
  });
  // find 메서드는 앞에 온 배열의 하나하나를 인자로 넣어주어 뒤에 콜백함수에 적어준 조건에 맞는 첫번째 값을 반환한다.
  // 만약 조건에 맞는 모든 값들을 얻고 싶다면 filter 함수를 사용해 배열형태로 조건에 맞는 값들을 받아올 수 있다.

  console.log(selectItem);
  console.log(id);

  function stockMinus() {
    let stock = [...props.stock];
    let idx = selectItem.id;
    console.log(stock);
    stock.splice(idx, 1, stock[idx] - 1);
    console.log(stock);
    return stock;
  }

  let [tab, tabChange] = useState(0);
  let [onoff, onoffChange] = useState(false);

  return (
    <div className="container">
      <Box>
        <Title className="red">Detail</Title>
      </Box>

      {inputData}
      <input
        onChange={(e) => {
          inputDataChange(e.target.value);
        }}
      />

      {
        // 보통의 UI가 이렇게 true. false를 반환하는 state를 만들고
        // 삼항조건식으로 생성 및 제거하는 방법으로 구축한다.
        alert === true ? (
          <div className="my-alert-2">
            <p>재고가 얼마 남지 않았습니다</p>
          </div>
        ) : null
      }

      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (selectItem.id + 1) +
              ".jpg"
            }
            width="100%"
            alt="이미지"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{selectItem.title}</h4>
          <p>{selectItem.content}</p>
          <p>{selectItem.price}원</p>
          <Info stock={props.stock} selectItem={selectItem}></Info>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.stockChange(stockMinus);
              props.dispatch({
                type: "addItem",
                payload: {
                  id: props.state[props.state.length - 1].id + 1,
                  name: selectItem.title,
                  quan: 1,
                },
              });
              history.push("/cart");
            }}
          >
            주문하기
          </button>
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => {
              history.push("/");
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              tabChange(0);
              onoffChange(false);
            }}
          >
            상품설명
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              tabChange(1);
              onoffChange(false);
            }}
          >
            배송정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              tabChange(2);
              onoffChange(false);
            }}
          >
            환불약관
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* in은 애니메이션 킬지 안킬지, classNames는 css지정 이름, timeout은 지속시간 */}
      <CSSTransition in={onoff} classNames="wow" timeout={500}>
        <TabContent tab={tab} onoffChange={onoffChange} />
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.onoffChange(true);
  });

  if (props.tab === 0) {
    return <div>0번째 내용입니다.</div>;
  } else if (props.tab === 1) {
    return <div>1번째 내용입니다.</div>;
  } else if (props.tab === 2) {
    return <div>2번째 내용입니다.</div>;
  }
}

function Info(props) {
  return <p>재고 : {props.stock[props.selectItem.id]}</p>;
}

function propsChange(state) {
  console.log(state);
  return {
    state: state.reducer,
    alert: state.reducer2,
  };
}

export default connect(propsChange)(Detail);
