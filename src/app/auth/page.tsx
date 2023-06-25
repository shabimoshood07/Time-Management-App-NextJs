import GoogleButton from "@/component/GoogleButton";
import GithubButton from "@/component/GithubButton";
const Auth = () => {
  return (
    <div className="border-2 border-slate-950 rounded-xl w-[98%] mx-auto max-w-xl my-16 py-2">
      <h1 className="text-center text-2xl font-bold text-slate-950">Sign In</h1>
      <form
        action=""
        className="w-full p-2 -slate-950 rounded-md"
        autoComplete="off"
      >
        <label htmlFor="email">Email</label>
        <input
          type="text"
          autoComplete="off"
          required
          className="block w-full mb-2 h-8 px-2 rounded-md active:outline-slate-950 text-lg"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          className="block w-full mb-2 h-8 px-2 rounded-md active:outline-slate-950 text-lg"
          autoComplete="new-password"
        />
        <button className="border block mx-auto rounded-lg p-2 w-full bg-yellow-500  text-slate-950 font-semibold hover:shadow-lg duration-150 my-4">
          Submit
        </button>

        <span className="w-full text-center block capitalize font-bold">
          or
        </span>
        <GoogleButton />
        <GithubButton />
      </form>
    </div>
  );
};

export default Auth;
