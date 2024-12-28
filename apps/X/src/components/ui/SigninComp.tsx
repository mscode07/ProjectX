import { SigninRightCom, X_logo } from "./index";

export const SigninComp = () => {
  return (
    <div>
      <div className="grid grid-cols-6">
        <div className="col-span-3 text-8xl">
          <div className="flex justify-center items-center h-screen">
            <X_logo />
          </div>
        </div>
        <div className="col-span-3">
          <SigninRightCom />
        </div>
      </div>
    </div>
  );
};
