'use client';
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {observer} from "mobx-react-lite";
import {getPosts, PostItem, UserItem} from "@/apis";
import {userStore} from "@/store";

const Posts = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<UserItem>();
    const [posts, setPosts] = useState<PostItem[]>([]);

    useEffect(() => {
        setUser(userStore.users.find((d: UserItem) => String(d.id) === params.id));
    }, [userStore.users])
    useEffect(() => {
        if (!userStore.users?.length) userStore.getUsers();
    }, [params.id])
    useEffect(() => {
        setLoading(true)
        getPosts({userId: params.id as string}).then(res => {
            setPosts(res as PostItem[]);
            setLoading(false);
        });
    }, [params.id])

    return (
        <main className="flex min-h-full flex-col p-10 bg-gray-50">
            <div className="accent-slate-950 mb-4">🦸‍♂️ {user?.name}</div>
            <div className="text-gray-500 mb-6">
                <section>📱 {user?.phone}</section>
                <section>📧 {user?.email}</section>
                <section>🚩 {user?.address.city}</section>
                <section>🌐 {user?.website}</section>
                <section>🏢 {user?.company.name}</section>
            </div>
            <div className="accent-slate-950 mb-5">Posts</div>
            {loading && Array.from(new Array(8)).map((_, index) => (
                <div key={index} className="rounded-2xl border border-gray-200 p-4 w-full mx-auto mb-3">
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {posts?.length ? posts.map(item => (
                <div key={item.id} className="rounded-2xl border border-gray-200 shadow p-4 mb-3 cursor-pointer">
                    <section>{item.title}</section>
                    <section className="text-xs text-gray-500">{item.body}</section>
                </div>
            )) : (
                <h1 className="flex justify-center mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">No data</h1>
            )}
        </main>
    );
}

export default observer(Posts);
