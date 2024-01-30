function Header({ openHelpModal }) {
  return (
    <header>
      <h1>BOGGDLE</h1>
      <div className='Header__Help' onClick={openHelpModal}>
        <p>Help</p>
      </div>
    </header>
  );
}

export default Header;
