import ChatBox from "./chatbox/page";
import SideBar from "./sidebar/page";

export default function Home() {
  return (
    <div className=" max-h-screen bg-white md:py-8 md:px-[4rem] lg:px-[8rem] font-[outfit]">
      <main className="flex h-[100vh] md:h-[calc(100vh-4rem)] w-[100%] overflow-hidden bg-[#edf2f4] md:rounded-4xl border-b-[3.5rem] border-b-[#ef233c]">
        <SideBar />
        <ChatBox />
      </main>
    </div>
  );
}
