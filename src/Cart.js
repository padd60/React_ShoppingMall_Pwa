import React from "react";
import { Table } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";

function Cart(props) {
  // 신문법 훅 useSelector로 createStore에 담긴 모든 reducer 즉, 스테이트들 받아옴
  let state = useSelector((state) => state);
  console.log(state.reducer);

  // createStore에 담긴 모든 reducer 즉, dispatch 즉 액션 받아옴
  let dispatch = useDispatch();

  return (
    <div>
      <div>
        <Table responsive="md">
          <thead>
            <tr>
              <th>#</th>
              <th>상품명</th>
              <th>수량</th>
              <th>변경</th>
            </tr>
          </thead>
          <tbody>
            {state.reducer.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.quan}</td>
                  <td>
                    <button
                      onClick={() => {
                        console.log(item.id);
                        dispatch({
                          type: "addQuan",
                          payload: { id: item.id },
                        });
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        dispatch({
                          type: "delQuan",
                          payload: { id: item.id },
                        });
                      }}
                    >
                      -
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {props.alert === true ? (
          <div className="my-alert-2">
            <p>지금 구매하시면 신규할인 20%</p>
            <button
              onClick={() => {
                props.dispatch({ type: "alertClose" });
              }}
            >
              닫기
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// 구버전 리덕스 state 받아오기 컴포넌트에서 props로 받아서 사용해야함
// function propsChange(state) {
//   console.log(state);
//   return {
//     state: state.reducer,
//     alert: state.reducer2,
//   };
// }

// export default connect(propsChange)(Cart);

export default Cart;
