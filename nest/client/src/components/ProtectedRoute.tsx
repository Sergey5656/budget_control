import {FC} from 'react';
import {useAuth} from "../hooks/useAuth";

interface Props {
    children: JSX.Element
}

export const ProtectedRoute: FC<Props> = ({children}) => {
    const isAuth = useAuth()
    console.log(isAuth);

    return (
        <>
            {isAuth ? (
                children
            ) : (
                <div className="flex flex-col justify-center items-center mt-20 gap-10">
                <h1 className="text-2xl"> Чтобы смотреть эту страницу нужно санчала войти в систему </h1>
                </div>
                )}
        </>
    )
};

export default ProtectedRoute;