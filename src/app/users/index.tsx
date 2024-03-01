import {useEffect, useState, FC} from "react";
import {useNavigate} from "react-router";
import {observer} from "mobx-react-lite";
import {UserItem} from "@/apis";
import {ComponentProps} from "@/store";

const Home: FC<ComponentProps> = ({props}) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

  const toPost = (id: number) => {
      navigate(`/posts/${id}`)
  }

  useEffect(() => {
      props.getUsers();
  }, [])
  useEffect(() => {
      if (props.users?.length) setLoading(false)
  }, [props.users])

  return (
    <main className="flex min-h-full flex-col p-10 bg-gray-50">
      <div className="accent-slate-950 mb-5">用户列表</div>
        {loading && Array.from(new Array(8)).map((_, index) => (
            <div key={index} className="rounded-2xl border border-gray-200 p-4 w-full mx-auto mb-3">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        ))}
      {props.users?.length ? props.users.map((item: UserItem) => (
          <div
              className="rounded-2xl border border-gray-200 p-4 mb-3 cursor-pointer shadow"
               key={item.id}
              onClick={() => toPost(item.id)}
          >
            <section>{item.name}</section>
            <section className="text-xs text-gray-500">{item.address.city}</section>
          </div>
      )) : (
          <h1 className="flex justify-center mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">No data</h1>
      )}
    </main>
  );
}

export default observer(Home);
