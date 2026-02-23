import React from 'react'

function Title({ title1, title2, titleStyles, title1Styles, paraStyles }) {
  return (
    <div className={titleStyles}>
      <h2 className={title1Styles}>
        {title1} <span className="text-destructive">{title2}</span>
      </h2>

      <p className={paraStyles}>
        Discover the best deals on top-quality products, crafted <br />
        to elevate your everyday experience.
      </p>
    </div>
  )
}

export default Title
