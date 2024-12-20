import { useState, useEffect } from 'react';

interface ServerData {
    url: string;
    name: string;
}

export function useServerData() {
    const [data, setData] = useState<ServerData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = `/servers.json`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();
                setData(json);

                console.log(json);
                // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            } catch (error: any) {

                console.error(error.message);
            }
            // Simulating API call with mock data for multiple servers
            //   const mockData: ServerData[] = [
            //     {
            //       url: 'http://62.72.59.54:3333',
            //       name: 'Server 1',

            //     },

            //   ];

            //   setData(mockData);
        };

        fetchData();
        // const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

        // return () => clearInterval(interval);
    }, []);

    return data;
}

