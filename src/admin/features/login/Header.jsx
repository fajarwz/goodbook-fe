import Logo from './Logo';

export default function Header() {
    return (
        <div className="mb-10">
          <Logo />
          <div className="text-center">Login to continue</div>
        </div>
    );
}
