import { Iframe } from "@bounceapp/iframe"
import { WebView } from 'react-native-webview';
import { useEffect, useState } from "react";

export function IframeScreen() {
    const [getUrl, setUri] = useState(''); 
    async function getUri() {
        var axios = require('react-native-axios');
        const IDOMParser = require("advanced-html-parser");
        
        let { data } = await axios.get('https://tennis1.sportshub.stream/');
        const doc = IDOMParser.parse(data, {
            ignoreTags: ["script", "style", "head"]
        });
        
        let response = await axios.get(doc.querySelector('.list-top-events > li > a')['attributes']['0']['nodeValue']);
        const doc2 = IDOMParser.parse(response.data, {
            ignoreTags: ["script", "style", "head"]
        });
        
        setUri(doc2.querySelector('#links_block > table:not(.lnkhdr) > tbody > tr > td > table > tbody > tr > td[align="right"] > a')['attributes']['0']['nodeValue']);
    }
    getUri();
    
    return (
        // <Text>---</Text>
        // <Iframe uri={getUrl} style={{flex: 1}} />
        <WebView source={{ uri: 'http://cdn.buffstreamz.fun/webplayer.php?t=ifr&c=2201362&lang=en&eid=152201500&lid=2201362&ci=4202&si=4&ask=1693756800' }} style={{ flex: 1 }} />
    );
}