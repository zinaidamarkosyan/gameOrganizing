export const fetchAddress = async (reverse, latitude, longitude, keyword) =>
  await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?${reverse ? 'latlng' : 'address'}=${
      reverse ? latitude + ',' + longitude : keyword
    }&key=${'AIzaSyBPDe31Cr9QeeZjeUW_pvS50vq3vQHvgjw'}&language=ru&region=ru`,
    // `https://maps.googleapis.com/maps/api/geocode/json?${'address'}=${state}&key=${'AIzaSyBPDe31Cr9QeeZjeUW_pvS50vq3vQHvgjw'}&language=${'ru'}&region=.${'ru'}`,
  )
