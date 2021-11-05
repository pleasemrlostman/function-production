import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const ReactHookForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // console.log(watch());
    console.log(errors);
    // onErrors와 같은값을 반환한다.
    const onSubmit = (data) => console.log(data);
    const onError = (error) => {
        // console.log(error);
    };

    return (
        <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
            <InputWrap>
                <Input
                    type="text"
                    placeholder="닉네임"
                    {...register("nickname", {
                        required: "닉네임을 작성해주세요",
                        minLength: {
                            value: 5,
                            message:
                                "닉네임은 5글자 이상으로 작성하셔야 합니다.",
                        },
                        maxLength: {
                            value: 12,
                            message:
                                "닉네임은 12글자 이하로 작성하셔야 합니다.",
                        },
                    })}
                />
                <button>중복확인</button>
            </InputWrap>
            {/* {errors.nickname && <span>{errors.nickname.message}</span>} */}
            {/* // 이런 애들을 옵셔널 체이닝이라고 한다 해당 객체값의 프로퍼티가 있으면 그걸 보여주지만 없으면 undefined나 null을 리턴한다 */}
            {errors?.nickname?.message}
            <InputWrap>
                <Input
                    type="text"
                    placeholder="아이디(이메일주소)"
                    {...register("userID", {
                        required: "아이디(이메일)을 작성해주세요",
                        pattern: {
                            // value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            value: /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                            message: "유효하지 않은 이메일 형식입니다.",
                        },
                    })}
                />
                <button>중복확인</button>
            </InputWrap>
            {errors?.userID?.message}
            <InputWrap>
                <Input
                    type="password"
                    placeholder="비밀번호"
                    {...register("password")}
                />
            </InputWrap>
            <InputWrap>
                <Input
                    type="password"
                    placeholder="비밀번호확인"
                    {...register("passwordCheck")}
                />
            </InputWrap>
            <InputWrap>
                <Input
                    type="text"
                    placeholder="휴대전화번호"
                    {...register("phoneNumber")}
                />
                <button>인증번호 전송</button>
            </InputWrap>
        </form>
    );
};

export default ReactHookForm;

const InputWrap = styled.div`
    border: 1px solid blue;
`;

const Input = styled.input`
    border: 1px solid red;
    padding: 10px;
`;
