const Button = () => {
  return (
    <button className="button place-self-end h-10 w-28 p-2 mr-4 flex justify-center items-center rounded-lg text-white font-semibold cursor-pointer transition-all duration-500 bg-[#0ba360] shadow-[10px_5px_50px_-11px_#0ba360] translate-y-20 bg-gradient-to-r from-[#0ba360] to-[#3cba92] group-hover:-translate-y-14">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        height={"30px"}
        width={"30px"}
      >
        <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          id="SVGRepo_tracerCarrier"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            fill="white"
            d="M12.75 6V3.75H11.25V6L9 6C6.10051 6 3.75 8.3505 3.75 11.25V17.909C3.75 19.2019 4.7981 20.25 6.09099 20.25C6.71186 20.25 7.3073 20.0034 7.74632 19.5643L10.8107 16.5H13.1893L16.2537 19.5643C16.6927 20.0034 17.2881 20.25 17.909 20.25C19.2019 20.25 20.25 19.2019 20.25 17.909V11.25C20.25 8.3505 17.8995 6 15 6L12.75 6ZM18.75 11.25C18.75 9.17893 17.0711 7.5 15 7.5L9 7.5C6.92893 7.5 5.25 9.17893 5.25 11.25V17.909C5.25 18.3735 5.62652 18.75 6.09099 18.75C6.31403 18.75 6.52794 18.6614 6.68566 18.5037L10.1893 15H13.8107L17.3143 18.5037C17.4721 18.6614 17.686 18.75 17.909 18.75C18.3735 18.75 18.75 18.3735 18.75 17.909V11.25ZM6.75 12.75V11.25H8.25V9.75H9.75V11.25H11.25V12.75H9.75V14.25H8.25V12.75H6.75ZM15 10.875C15 11.4963 14.4963 12 13.875 12C13.2537 12 12.75 11.4963 12.75 10.875C12.75 10.2537 13.2537 9.75 13.875 9.75C14.4963 9.75 15 10.2537 15 10.875ZM16.125 14.25C16.7463 14.25 17.25 13.7463 17.25 13.125C17.25 12.5037 16.7463 12 16.125 12C15.5037 12 15 12.5037 15 13.125C15 13.7463 15.5037 14.25 16.125 14.25Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>{" "}
        </g>
      </svg>
      <span className="text-lg">Play</span>
    </button>
  );
};

export default Button;
