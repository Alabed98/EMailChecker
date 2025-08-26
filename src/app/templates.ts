export interface Templates {
    name:string;
    code:string;
}

export const SNIPPETS:Templates[] = [
    {
        name:'Investor',
        code:`<mjml>
  	<mj-head>
      
    	<mj-attributes>
        <mj-preview>##############</mj-preview>
      	 <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
      </mj-attributes>
      
      <mj-include path="../css-1.mjml" />	
      
    </mj-head>
  	<mj-body background-color="#cccccc">
    <!----------------------Start E-Mail-------------------------->
    <mj-include path="../header-inv.mjml" />
      
          
<mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0" padding-bottom="0" >

  
  
      <br/>      
     
 </mj-text>

</mj-column>
</mj-section>
      
       <mj-include path="../footer.mjml" />
      
      
    </mj-body>
  
  </mjml>`
    }, 
    {
        name:'GeVestor', 
        code:`<mjml>
  	<mj-head>
      
    	<mj-attributes>
        <mj-preview>##############</mj-preview>
      	 <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
      </mj-attributes>
      
      <mj-include path="../css-1.mjml" />	
      
    </mj-head>
  	<mj-body background-color="#cccccc">
    <!----------------------Start E-Mail-------------------------->
    <mj-include path="../header-gevestor.mjml" />
      
          
<mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0" padding-bottom="0" >

  
  
      <br/>      
     
 </mj-text>

</mj-column>
</mj-section>
      
       <mj-include path="../footer-gevestor.mjml" />
      
      
    </mj-body>
  
  </mjml>`
    },
    {
        name:'Advance',
        code:`
   <mjml>
  	<mj-head>
    	<mj-attributes>

      	 <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
      </mj-attributes>
      
      <mj-include path="../css-1.mjml" />	
      
    </mj-head>
  	<mj-body background-color="#cccccc">
    <!----------------------Start E-Mail-------------------------->

      <mj-section background-color="#cccccc" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="10px" padding-bottom="10px" >
<p align="center" style="margin:0px 0; padding:0px 0;line-height:1.5;"><font size="1" face="Verdana">{preHeader}</font></p>
 </mj-text>

</mj-column>
</mj-section>
      
<mj-section background-color="white" padding-bottom="0" padding-top="0">

  <mj-column padding-top="10px">
    <mj-text padding-top="10px" padding-bottom="10px" >
   {header}
    
    </mj-text>
		
	
  </mj-column>

</mj-section>
      
      
      
        
<mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0" padding-bottom="0" >

  
      <br/>      
     
 </mj-text>

</mj-column>
</mj-section>
      
      
       <mj-include path="../footer-footer.mjml" />
      
      
    </mj-body>
  
  </mjml>
  `
    },
    {
        name:'Investor-Webinar',
        code:`<mjml>
  	<mj-head>
      
    	<mj-attributes>
        <mj-preview>##############</mj-preview>
      	 <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
      </mj-attributes>
      
      <mj-include path="../css-1.mjml" />	
      
    </mj-head>
  	<mj-body background-color="#cccccc">
    <!----------------------Start E-Mail-------------------------->
<mj-section background-color="#cccccc" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="10px" padding-bottom="10px" >
<p align="center" style="margin:0px 0; padding:0px 0;line-height:1.5;"><font size="1" face="Verdana">Wenn diese Mail nicht korrekt angezeigt wird, klicken Sie bitte <a href="{Online-Version-Link}">hier</a></font></p>
 </mj-text>

</mj-column>
</mj-section>     
<mj-section background-color="white" padding-bottom="0" padding-top="0">

  <mj-column padding-top="10px">

      
			 <mj-image src="https://static.fid-images.de/Investor/lp/bilder/inv_logo.jpg" alt="Investor Verlag" width="200px" height="auto" align="left"/>
	
  </mj-column>

</mj-section>
      
          
<mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0" padding-bottom="0" >

  
  
      <br/>      
     
 </mj-text>

</mj-column>
</mj-section>
      
       <mj-include path="../footer-inv-webinar.mjml" />
      
      
    </mj-body>
  
  </mjml>`
    },
    {
        name:'GeVestor-Webinar',
        code:`<mjml>
  	<mj-head>
      
    	<mj-attributes>
        <mj-preview>##############</mj-preview>
      	 <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
      </mj-attributes>
      
      <mj-include path="../css-1.mjml" />	
      
    </mj-head>
  	<mj-body background-color="#cccccc">
    <!----------------------Start E-Mail-------------------------->
<mj-section background-color="#cccccc" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0px" padding-bottom="0px" >
<p align="center" style="margin:10px 0; padding:0px 0;line-height:1.5;"><font size="1" face="Verdana">Wenn diese Mail nicht korrekt angezeigt wird, klicken Sie bitte <a href="{Online-Version-Link}">hier</a></font></p>
 </mj-text>

</mj-column>
</mj-section>     
<mj-section background-color="#ffffff">

  <mj-column>
    <!--
    <mj-text padding-bottom="0"> 
				   <p style="font-size:0.8em;">Ausgabe vom {customDatum}</p>
			 </mj-text>
--->
      
    
			 <mj-image src="https://static.fid-images.de/Investor/lp/bilder/gevestor-logo-1.jpg" alt="Gevestor Verlag"  width="200px" align="left"/>
    
    
    </mj-column>
     


</mj-section>
          
<mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0" padding-bottom="0" >

  
  
  INAHLT
  
      <br/>      
     
 </mj-text>

</mj-column>
</mj-section>
      
       <mj-include path="../footer-gev-webinar.mjml" />
      
      
    </mj-body>
  
  </mjml>`
    },
    {
        name:"Abo-laufend-GeVestor",
        code:`<mjml>
  	<mj-head>
      
    	<mj-attributes>
        <mj-preview>##############</mj-preview>
      	 <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
      </mj-attributes>
      
      <mj-include path="../css-1.mjml" />	
      
    </mj-head>
  	<mj-body background-color="#cccccc">
    <!----------------------Start E-Mail-------------------------->
<mj-section background-color="#cccccc" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0px" padding-bottom="0px" >
<p align="center" style="margin:10px 0; padding:0px 0;line-height:1.5;"><font size="1" face="Verdana">Wenn diese Mail nicht korrekt angezeigt wird, klicken Sie bitte <a href="{Online-Version-Link}">hier</a></font></p>
 </mj-text>

</mj-column>
</mj-section>     
<mj-section background-color="#ffffff">

  <mj-column>
    <!--
    <mj-text padding-bottom="0"> 
				   <p style="font-size:0.8em;">Ausgabe vom {customDatum}</p>
			 </mj-text>
--->
      
    
			 <mj-image src="https://static.fid-images.de/Investor/lp/bilder/gevestor-logo-1.jpg" alt="Gevestor Verlag"  width="200px" align="left"/>
    
    
    </mj-column>
     


</mj-section>
          
<mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0" padding-bottom="0" >

  
  
  INAHLT
  
      <br/>      
     
 </mj-text>

</mj-column>
</mj-section>
      
       <mj-include path="../footer-gev-abo.mjml" />
      
      
    </mj-body>
  
  </mjml>`
    },
      {
        name:"Abo-laufend-Investor",
        code:`<mjml>
  	<mj-head>
      
    	<mj-attributes>
        <mj-preview>##############</mj-preview>
      	 <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
      </mj-attributes>
      
      <mj-include path="../css-1.mjml" />	
      
    </mj-head>
  	<mj-body background-color="#cccccc">
    <!----------------------Start E-Mail-------------------------->
<mj-section background-color="#cccccc" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="10px" padding-bottom="10px" >
<p align="center" style="margin:0px 0; padding:0px 0;line-height:1.5;"><font size="1" face="Verdana">Wenn diese Mail nicht korrekt angezeigt wird, klicken Sie bitte <a href="{Online-Version-Link}">hier</a></p>
 </mj-text>

</mj-column>
</mj-section>     
<mj-section background-color="white" padding-bottom="0" padding-top="0">

  <mj-column padding-top="10px">

      
			 <mj-image src="https://static.fid-images.de/Investor/lp/bilder/inv_logo.jpg" alt="Investor Verlag" width="200px" height="auto" align="left"/>
	
  </mj-column>

</mj-section>
          
<mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0" padding-bottom="0" >

  
  
  INAHLT
  
      <br/>      
     
 </mj-text>

</mj-column>
</mj-section>
      
       <mj-include path="../footer-inv-abo.mjml" />
      
      
    </mj-body>
  
  </mjml>`
    },
    {
        name:"maxLQ",
        code:`<mjml>
  	<mj-head>
      
    	<mj-attributes>
        <mj-preview>##############</mj-preview>
      	 <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
      </mj-attributes>
      
      <mj-include path="../css-1.mjml" />	
      
    </mj-head>
  	<mj-body background-color="#cccccc">
    <!----------------------Start E-Mail-------------------------->
    <mj-include path="../header-maxlq.mjml" />
      
          
<mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0" padding-bottom="0" >

  
  
      <br/>      
     
 </mj-text>

</mj-column>
</mj-section>
      
       <mj-include path="../footer-maxlq.mjml" />
      
      
    </mj-body>
  
  </mjml>`
    },
     {
        name:"maxLQ-Magdalena",
        code:`<mjml>
  	<mj-head>
      
    	<mj-attributes>
        <mj-preview>##############</mj-preview>
      	 <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
      </mj-attributes>
      
      <mj-include path="../css-1.mjml" />	
      
    </mj-head>
  	<mj-body background-color="#cccccc">
    <!----------------------Start E-Mail-------------------------->
    <mj-include path="../header-maxlq-preHeader.mjml" />
      
          
<mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0" padding-bottom="0" >

  
  
      <br/>      
     
 </mj-text>

</mj-column>
</mj-section>
      
       <mj-include path="../footer-maxlq.mjml" />
      
      
    </mj-body>
  
  </mjml>`
    },

]