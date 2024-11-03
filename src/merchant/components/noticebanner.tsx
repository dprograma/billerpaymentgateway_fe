// NoticeBanner.js

const NoticeBanner = () => (
    <div style={{
      backgroundColor: 'yellow',
      width: '100%',
      height: '20px',
      textAlign: 'center',
      lineHeight: '20px', 
      position: 'fixed', 
      color: 'red',
      top: 0,
      left: 0,
      zIndex: 1000 
    }}>
      <strong>Notice:</strong> This is a test website. It is not meant for any commercial use.
    </div>
  );
  
  export default NoticeBanner;
  