

const Title = ({section, color, rotate}) => {
    return (
        <div id="titleParent">
        <h1 className={`${rotate?"rotate":""} sectionTitle`}>{section}</h1>
        <h1 className={`sectionTitle titleGlow ${color}Glow`}>{section}</h1>
      </div>
    );
};


export default Title;