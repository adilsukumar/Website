import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

// Only lazy load heavy components
const Honors = lazy(() => import("@/components/Honors"));
const Certificates = lazy(() => import("@/components/Certificates"));
const Contact = lazy(() => import("@/components/Contact"));
const Chatbot = lazy(() => import("@/components/Chatbot"));

const LoadingSpinner = () => (
  <div className="h-96 flex items-center justify-center">
    <div className="relative">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border border-primary/20"></div>
    </div>
  </div>
);

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="h-96 flex items-center justify-center">
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
      <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
      <button 
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
      >
        Try again
      </button>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner />}>
              <Honors />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner />}>
              <Certificates />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner />}>
              <Contact />
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={null}>
            <Chatbot />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Index;
