import Head from "next/head";
import BaseTemplate from "../components/BaseTemplate";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dropzone from "../components/Dropzone";
import Item from "../components/Item";
import ItemContainer from "../components/ItemContainer";
import { getAuthCookie } from "../utils/auth-cookies";
import useSWR from "swr";
import CustomDragLayer from "../components/CustomDragLayer";

export default function Sneakers({ token }) {
  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data: user, mutate: mutateUser } = useSWR("/api/user", fetcher);
  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <BaseTemplate>
        <div className="flex-1 flex flex-col pt-1">
          {/* <div className="flex align-items-center justify-between w-full p-2">
          <div className="flex items-center text-black font-bold text-3xl px-2">
          Buying and selling is now zero effort
          </div>
          <div className="w-1/4">
          <Dropzone />
          </div>
        </div> */}
          <div className="flex justify-end p-3 pt-6 pr-4">
            <div className="flex">
              <button
                data-tip="Coming soon!"
                className="flex-1 flex bg-green-100 hover:bg-green-200 rounded-md font-bold p-2 focus:shadow-outline"
              >
                <span className="text-green-900 ">+ Create New Listing</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-scroll">
            <ItemContainer>
              <Item
                user={user}
                subtitle="AdidasTHE GAME | DIAMOND 💎 Edition | 7 of 7"
                name="Suede High Top"
                price="50"
                imgPath="https://lh3.googleusercontent.com/Bg1Bv16CKBPpKRMth17aPub4LwzlMeUnBuM3LoU51DX4V0S96ebqWy-FQt0CL_K2YtM9zAfhKYSZX6A2qkCj8i41ddkEBW_NhRdHnw=s0"
              />
              <Item
                user={user}
                subtitle="Nike"
                name="Red"
                price="50"
                imgPath="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
              />
              <Item
                user={user}
                subtitle="Adidas"
                name="Hype"
                price="50"
                imgPath="https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
              />
              <Item
                user={user}
                subtitle="Nike"
                name="RBW"
                price="50"
                imgPath="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              />
            </ItemContainer>
          </div>
        </div>
      </BaseTemplate>
    </DndProvider>
  );
}

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req);
  return { props: { token: token || null } };
}
