/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

const AboutPage = () => {
  const imgStyle = {
    width: "100%",
    height: "auto",
    padding: "10px",
    boxSizing: "border-box",
    borderRadius: "500px",
    border: "2px green solid",
    marginTop: "20px"
  }

  return (
    <div style={{padding: "20px"}}>
      <h2>About Page</h2>
      <img src="./profilePic.jpg" alt="profile pic" style={imgStyle} />
      <p>This could be a landing page for your website. Having 3D elements mixed with regular html could make your website really standout.</p>
      <p>The interactive elements like mini games could be linked to additional content to promote engagment.</p>
    </div>
  )
}

export default AboutPage
