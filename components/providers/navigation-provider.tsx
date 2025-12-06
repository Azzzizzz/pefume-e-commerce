"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, createContext, useContext, Suspense } from "react";
import { PageLoader } from "@/components/ui/page-loader";

const NavigationContext = createContext({
    isNavigating: false,
    startNavigation: () => { },
});

export function useNavigation() {
    return useContext(NavigationContext);
}

function NavigationEventsInner({ setIsNavigating }: { setIsNavigating: (value: boolean) => void }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Navigation complete - hide loader after a brief delay for smooth transition
        const timer = setTimeout(() => {
            setIsNavigating(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [pathname, searchParams, setIsNavigating]);

    return null;
}

function NavigationEvents({ setIsNavigating }: { setIsNavigating: (value: boolean) => void }) {
    return (
        <Suspense fallback={null}>
            <NavigationEventsInner setIsNavigating={setIsNavigating} />
        </Suspense>
    );
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const [isNavigating, setIsNavigating] = useState(false);

    const startNavigation = () => {
        setIsNavigating(true);
    };

    return (
        <NavigationContext.Provider value={{ isNavigating, startNavigation }}>
            <NavigationEvents setIsNavigating={setIsNavigating} />
            <PageLoader isLoading={isNavigating} />
            {children}
        </NavigationContext.Provider>
    );
}
