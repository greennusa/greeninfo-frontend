import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CpuChart } from "./CpuChart"
import { MemoryChart } from "./MemoryChart"
import { StorageChart } from "./StorageChart"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

interface ServerCardProps {
    server: {
        url: string;
        name: string;
        endpoint?: string;

    };
}

export function ServerCard({ server }: ServerCardProps) {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null);
    const [status, setStatus] = useState<string>('loading');


    useEffect(() => {
        async function getData() {
            let url = `${server.url}`;

            if(server.endpoint){
                url = `${server.url}/${server.endpoint}`;
            } else {
                url = `${server.url}/usage`;
            }
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();
                setData(json);
                setStatus('online');
                console.log(json);
                // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setData(null);
                setStatus('error');
                console.error(error.message);
            }
        }


        getData();
        const interval = setInterval(getData, 5000); // Fetch every 5 seconds

        return () => clearInterval(interval);
    }, []);
    if (!server) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Error</CardTitle>
                    <CardDescription>Server data is unavailable</CardDescription>
                </CardHeader>
            </Card>
        );
    }
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{server.name}</CardTitle>
                    <Badge variant={status === 'online' ? 'default' : 'destructive'}>
                        {status}
                    </Badge>
                </div>
                <CardDescription>Server Url: {server.url}</CardDescription>
            </CardHeader>
            {data && <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CpuChart load={data.cpu.load} history={data.cpu.history} />
                    <MemoryChart {...data.memory} />
                    <div className="md:col-span-2">
                        <StorageChart storage={data.storage} />
                    </div>
                </div>
            </CardContent>}
        </Card>
    )
}

