import "./Homepage.css"
export default function Homepage(){
    return(
        <>
            <div
                className="hero flex-grow"
                style={{
                    backgroundImage:
                    "url(https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                }}
                >
                <div className="hero-overlay"></div>
                <div className="glass w-full hero-content text-neutral-content text-center ">
                    <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold"><b>Master Coding Skills. Anytime, Anywhere</b></h1>
                    <p className="mb-5 para">
                       CodeCast is your all-in-one coding education platform, offering subscription-based access to expert-led courses, real-world projects, and industry-focused interview prep. Whether you're a beginner or a seasoned developer, our structured learning paths and hands-on challenges will help you grow faster and build skills that actually matter in today’s tech-driven world.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </>
    )
}