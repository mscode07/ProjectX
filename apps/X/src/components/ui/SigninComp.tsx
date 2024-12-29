import { SigninRightCom, X_logoBIG } from "./index";

export const SigninComp = () => {
  return (
    <div>
      <div className="custom:grid custom:grid-cols-6 custom:items-center">
        <div className="custom:col-span-3 text-8xl">
          <div className="custom:flex custom:justify-center custom:items-center">
            <div className="mx-10 mt-20 ">
              <X_logoBIG />
            </div>
          </div>
        </div>
        <div className="custom:col-span-3 flex flex-col items-center justify-center mx-10">
          <SigninRightCom />
        </div>
      </div>
    </div>
  );
};
