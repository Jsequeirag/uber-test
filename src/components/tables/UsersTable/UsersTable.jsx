import UsersBody from "./UsersBody";
import UsersHead from "./UsersHead";
import UserHeader from "./UsersHeader";
const UsersTable = () => {
  return (
    <>
      <div className="h-auto w-[100%]  min-w-[300px] desktop:p-4 mb-2 ">
        <div className="bg-white rounded-2xl border shadow-md">
          <UserHeader />
          <div className="break-words  rounded-2xl  bg-light/30  tablet:mt-8 phone:mt-8">
            <div className="overflow-x-auto max-h-[500px] ">
              <table className="min-w-[400px] w-full my-0 align-middle text-dark border-neutral-200">
                <UsersHead />
                <UsersBody />
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
