import { useSession } from "next-auth/react";
import React from "react";

export function UseSessionHook() {
	const { data: session, status } = useSession();
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		if (session) {
			setLoading(false);
		}
	}, [session]);

	return { session, loading };
}
