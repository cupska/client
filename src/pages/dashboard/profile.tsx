import { CgProfile } from "react-icons/cg";
import { userServices } from "../../services/user.services";

export default function Profile() {
  const { data, isSuccess } = userServices.useProfileQuery(null);

  return (
    <>
      {isSuccess && (
        <div className=" grid grid-cols-2 gap-y-8">
          <div className=" col-span-2 grid-cols-4 grid">
            <div className=" text-2xl  text-center ">
              <CgProfile className=" text-7xl w-fit m-auto" />
              <div className=" text-xl font-medium text-center">
                {data.data.username}
              </div>
            </div>
          </div>
          <div className=" col-span-2 grid grid-cols-4"></div>
          <div>
            <div className=" text-sm">Nama</div>
            <div className=" font-medium text-lg">{data.data.fullname}</div>
          </div>
          <div>
            <div className=" text-sm">Role</div>
            <div className=" font-medium text-lg">{data.data.role}</div>
          </div>
        </div>
      )}
    </>
  );
}
