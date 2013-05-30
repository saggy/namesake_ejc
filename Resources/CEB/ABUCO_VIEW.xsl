 <!-- version 7.6 
Revision history
=================================

-->
<xsl:stylesheet version="1.0"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:a="http://www.bibletechnologies.net/2003/OSIS/namespace"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output indent="no" encoding="UTF-8" method="html"/>
<xsl:variable name="styleType">client</xsl:variable>

<!-- <xsl:preserve-space elements="*"/>
<xsl:template match="text()">
<xsl:value-of select="translate(.,'&gt; &lt;','&gt;&#160;&lt;')"/>
</xsl:template> -->


<xsl:template match="/">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title></title>
		<meta name="viewport" content="width=device-width, user-scalable=no, maximum-scale=1.0" />
		<link rel="stylesheet" media="all and (orientation:portrait)" href="main.css" />
		<link rel="stylesheet" media="all and (orientation:landscape)" href="landscape.css" />
		<script type="text/javascript" src="jquery-1.4.2.min.js" charset="utf-8"></script>
		<script type="text/javascript" src="bible.js" charset="utf-8"></script>
		</head>
<body onload="load();">
	<div id="multicolumn4" class="box">
	<xsl:choose>
	<xsl:when test="$styleType='local'">
		<script type="text/javascript" src="E:\PROJECTS\ABUCO\NEW_PROCESSS\TOOL\XSL_VIEW\JS\wz_tooltip.js"></script>
	</xsl:when>
	<xsl:when test="$styleType='client'">
		<script type="text/javascript" src="JS/wz_tooltip.js"></script>
	</xsl:when>
	</xsl:choose>
	<xsl:apply-templates select="//a:osisText/a:div"/>
	</div>
	<xsl:call-template name="footNote"/>
</body>
</html>
</xsl:template>

<xsl:template match="a:title">
<xsl:variable name="par" select="parent::node()"/>
<xsl:choose>
<xsl:when test="@type">
<p>
<xsl:attribute name="class"><xsl:value-of select="@type"/></xsl:attribute>
<xsl:apply-templates/>
</p>
</xsl:when>

<xsl:otherwise>
<p><xsl:apply-templates/></p>
</xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template match="a:osisText/a:div">
	<xsl:apply-templates/>
</xsl:template>

<xsl:template match="a:div/a:div">
<div>
<!-- commented because all titles are placed at 
<xsl:apply-templates select="a:title"/>
<xsl:apply-templates select="*[not(self::a:title)]"/> -->
<xsl:apply-templates/>
</div>
</xsl:template>

<!-- common matches -->

<xsl:template match="a:q">
<xsl:variable name="type" select="@type"/>
<xsl:choose>
<xsl:when test="$type='x-complete'">
&#x0201C;<xsl:apply-templates/>&#x0201D;
</xsl:when>
<xsl:when test="$type='x-start'">
&#x0201C;<xsl:apply-templates/>
</xsl:when>
<xsl:when test="$type='x-end'">
<xsl:apply-templates/>&#x0201D;
</xsl:when>
<xsl:when test="$type='x-continuation'">
<xsl:apply-templates/>
</xsl:when>
<xsl:otherwise>
&#x0201C;<xsl:apply-templates/>&#x0201D;
</xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template match="a:speech">
&#x0201C;<xsl:apply-templates/>&#x0201D;
</xsl:template>

<xsl:template match="a:speak">
&#x0201C;<xsl:apply-templates/>&#x0201D;
</xsl:template>

<xsl:template match="a:p">
<xsl:choose>
<xsl:when test="@type='x-CEBFootnoteText'">
<xsl:apply-templates/>
</xsl:when>

<xsl:when test="@type='x-CEBListingBullet'">
<p>
<xsl:attribute name="class"><xsl:value-of select="@type"/></xsl:attribute>
<xsl:text>&#8226;&#160;&#160;&#160;&#160;</xsl:text><xsl:apply-templates/>
</p>
</xsl:when>

<xsl:when test="@type='x-CEBExcursus'">
<xsl:if test="not(preceding-sibling::*[1][self::a:p/@type='x-CEBExcursus']) and not(preceding-sibling::*[1][self::a:p/@type='x-CEBExcursusHead'])">
<p>
<xsl:attribute name="class"><xsl:value-of select="@type"/></xsl:attribute>
<xsl:apply-templates/>
</p>
</xsl:if>
</xsl:when>

<xsl:when test="@type='x-CEBExcursusHead' and following-sibling::*[1][self::a:p/@type='x-CEBExcursusPoetry1']">
<p/>
<p>
<xsl:attribute name="class">x-CEBExcursusHead</xsl:attribute>
<xsl:apply-templates/>
</p>
</xsl:when>

<xsl:when test="@type='x-CEBExcursusPoetry1'">
<p class="x-CEBExcursusPoetry1">
<xsl:apply-templates/>
</p>

</xsl:when>

<xsl:when test="@type='x-CEBExcursusHead'">
<p/>
<table class="exTable">
<tr>
<td class="exTable">
<p>
<xsl:attribute name="class"><xsl:value-of select="@type"/><xsl:text>TABLE</xsl:text></xsl:attribute>
<xsl:apply-templates/>
</p>
</td>
</tr>
<xsl:if test="following-sibling::*[1][self::a:p/@type='x-CEBExcursus']">
<tr><td class="exTable">
<xsl:call-template name="CEBEx">
<xsl:with-param name="ps" select="following-sibling::*[1]"/>
</xsl:call-template>
</td></tr>
	<xsl:if test="following-sibling::*[2][self::a:p/@type='x-CEBExcursus']">
	<tr><td class="exTable">
	<xsl:call-template name="CEBEx">
	<xsl:with-param name="ps" select="following-sibling::*[2]"/>
	</xsl:call-template>
	</td></tr>
		<xsl:if test="following-sibling::*[3][self::a:p/@type='x-CEBExcursus']">
		<tr><td class="exTable">
		<xsl:call-template name="CEBEx">
		<xsl:with-param name="ps" select="following-sibling::*[3]"/>
		</xsl:call-template>
		</td></tr>
			<xsl:if test="following-sibling::*[4][self::a:p/@type='x-CEBExcursus']">
			<tr><td class="exTable">
			<xsl:call-template name="CEBEx">
			<xsl:with-param name="ps" select="following-sibling::*[4]"/>
			</xsl:call-template>
			</td></tr>
				<xsl:if test="following-sibling::*[5][self::a:p/@type='x-CEBExcursus']">
				<tr><td class="exTable">
				<xsl:call-template name="CEBEx">
				<xsl:with-param name="ps" select="following-sibling::*[5]"/>
				</xsl:call-template>
				</td></tr>
					<xsl:if test="following-sibling::*[6][self::a:p/@type='x-CEBExcursus']">
					<tr><td class="exTable">
					<xsl:call-template name="CEBEx">
					<xsl:with-param name="ps" select="following-sibling::*[6]"/>
					</xsl:call-template>
					</td></tr>
						<xsl:if test="following-sibling::*[7][self::a:p/@type='x-CEBExcursus']">
						<tr><td class="exTable">
						<xsl:call-template name="CEBEx">
						<xsl:with-param name="ps" select="following-sibling::*[7]"/>
						</xsl:call-template>
						</td></tr>
							<xsl:if test="following-sibling::*[8][self::a:p/@type='x-CEBExcursus']">
							<tr><td class="exTable">
							<xsl:call-template name="CEBEx">
							<xsl:with-param name="ps" select="following-sibling::*[8]"/>
							</xsl:call-template>
							</td></tr>
								<xsl:if test="following-sibling::*[9][self::a:p/@type='x-CEBExcursus']">
								<tr><td class="exTable">
								<xsl:call-template name="CEBEx">
								<xsl:with-param name="ps" select="following-sibling::*[9]"/>
								</xsl:call-template>
								</td></tr>
									<xsl:if test="following-sibling::*[10][self::a:p/@type='x-CEBExcursus']">
									<tr><td class="exTable">
									<xsl:call-template name="CEBEx">
									<xsl:with-param name="ps" select="following-sibling::*[10]"/>
									</xsl:call-template>
									</td></tr>
									</xsl:if>
								</xsl:if>
							</xsl:if>
						</xsl:if>
					</xsl:if>
				</xsl:if>
			</xsl:if>
		</xsl:if>
	</xsl:if>
</xsl:if>
</table>
<p/>
</xsl:when>

<xsl:otherwise> 
<p id="{generate-id(.)}" onclick="javascript:func(this)">
<xsl:attribute name="class"><xsl:value-of select="@type"/></xsl:attribute>
<xsl:apply-templates/>
</p>
</xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template name="CEBEx">
<xsl:param name="ps"/>
<xsl:apply-templates select="$ps" mode="special"/>
</xsl:template>

<xsl:template match="a:p" mode="special">
<p>
<xsl:attribute name="class"><xsl:value-of select="@type"/><xsl:text>TABLE</xsl:text></xsl:attribute>
<xsl:apply-templates/>
</p>
</xsl:template>

<xsl:template match="a:table">
<table id="tbl{generate-id(.)}" onclick="javascript:func(this)">
<xsl:attribute name="class"><xsl:value-of select="@type"/></xsl:attribute>
<xsl:for-each select="a:row">
	<tr>
		<xsl:apply-templates select="."/>
	</tr>
</xsl:for-each>
</table>
</xsl:template>


<xsl:template match="a:row">
<xsl:for-each select="a:cell">
	<xsl:apply-templates select="."/>
</xsl:for-each>
</xsl:template>

<!-- <xsl:template match="a:row">
<xsl:variable name="cou" select="count(a:cell)"/>
<xsl:for-each select="a:cell">
<xsl:choose>
<xsl:when test="position()='1'">
	<xsl:apply-templates>
		<xsl:with-param name="align" select="left"/>
	</xsl:apply-templates>
</xsl:when>
<xsl:when test="position()=$cou">
	<xsl:apply-templates>
		<xsl:with-param name="align" select="right"/>
	</xsl:apply-templates>
</xsl:when>
<xsl:otherwise>
	<xsl:apply-templates>
		<xsl:with-param name="align" select=""/>
	</xsl:apply-templates>
</xsl:otherwise>
</xsl:choose>
</xsl:for-each>
</xsl:template> -->

<xsl:template match="a:cell">
<xsl:variable name="cou" select="count(parent::a:row/a:cell)"/>
<xsl:variable name="pos" select="parent::a:row/a:cell"/>
<xsl:choose>
<xsl:when test="@role='label'">
<th>
<xsl:apply-templates/>
</th>
</xsl:when>
<xsl:otherwise>
<td>
<xsl:apply-templates/>
</td>
</xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template match="a:note">
<xsl:variable name="na" select="substring-after(@osisID,'!note.')"/>
<span>
<xsl:attribute name="class"><xsl:value-of select="@type"/></xsl:attribute>
<sup>
<a>
<xsl:attribute name="onclick"><xsl:text>showRef(this, '</xsl:text><xsl:value-of select="@osisID"/><xsl:text>'); return false;</xsl:text></xsl:attribute>
<xsl:attribute name="href">javascript:void(0);</xsl:attribute>
<xsl:value-of select="$na"/>
</a>
</sup>
</span>
</xsl:template>


<!-- <xsl:template match="a:verse">
<xsl:variable name="sid"><xsl:value-of select="@sID"/></xsl:variable>
<span>
<xsl:attribute name="class"><xsl:value-of select="@type"/></xsl:attribute>
<sup><xsl:value-of select="substring-after(substring-after($sid,'.'),'.')"/></sup>
</span>
</xsl:template> -->

<xsl:template match="a:verse">
<xsl:variable name="osID"><xsl:value-of select="@osisID"/></xsl:variable>
<xsl:variable name="num"><xsl:value-of select="substring-after(substring-after($osID,'.'),'.')"/></xsl:variable>
<xsl:variable name="type" select="@subType"/>
<xsl:if test="$type='x-complete' or $type='x-start' or not(@subType)">
<xsl:choose>
<xsl:when test="$num='1'">
<span>
<xsl:attribute name="class">x-CEBChapterNo</xsl:attribute>
<xsl:attribute name="verse"><xsl:value-of select="@osisID"/></xsl:attribute>
<xsl:value-of select="substring-before(substring-after($osID,'.'),'.')"/>
</span>
</xsl:when>
<xsl:otherwise>
<span>
<xsl:attribute name="class"><xsl:value-of select="@type"/></xsl:attribute>
<xsl:attribute name="verse"><xsl:value-of select="@osisID"/></xsl:attribute>
<sup><xsl:value-of select="$num"/></sup>
</span>
</xsl:otherwise>
</xsl:choose>
</xsl:if>
<xsl:if test="$type='x-end'">
<xsl:choose>
<xsl:when test="$type='x-end'">
<span>
<xsl:attribute name="class">splitVerse</xsl:attribute>
<xsl:attribute name="verse"><xsl:value-of select="@osisID"/></xsl:attribute>
</span>
</xsl:when>
</xsl:choose>
</xsl:if>
<!-- commented
<xsl:choose>
<xsl:when test="$type='x-complete'">
&#x0201C;<xsl:apply-templates/>&#x0201D;
</xsl:when>
<xsl:when test="$type='x-start'">
&#x0201C;<xsl:apply-templates/>
</xsl:when>
<xsl:when test="$type='x-end'">
<xsl:apply-templates/>&#x0201D;
</xsl:when>
<xsl:when test="$type='x-continuation'">
<xsl:apply-templates/>
</xsl:when>
<xsl:otherwise>
&#x0201C;<xsl:apply-templates/>&#x0201D;
</xsl:otherwise>
</xsl:choose>-->
<xsl:apply-templates/>
</xsl:template>


<xsl:template name="footNote">
<div style="visibility: show">
<xsl:if test="//a:note">
<xsl:text>&#x0A;_________________________________________________</xsl:text>
</xsl:if>
<font size="0pt">
<xsl:for-each select="//a:note">
	<xsl:variable name="na" select="substring-after(@osisID,'!note.')"/>
	<xsl:variable name="ooID" select="@osisID"/>
	<xsl:if test="not(preceding::a:note[substring-after(@osisID,'!note.')=$na] and preceding::a:note[@osisID=$ooID])">
     <xsl:value-of select="@na"/>
	<xsl:text>&#x0A;</xsl:text><p>
		<xsl:attribute name="id"><xsl:value-of select="@osisID"/></xsl:attribute>
		<xsl:attribute name="class"><xsl:value-of select="a:p/@type"/></xsl:attribute>
		<span class="x-CEBFootnoteRef"><sup><xsl:value-of select="$na"/></sup></span><xsl:text>&#xA0;</xsl:text>
                <CEBFootnoteRef>
		<xsl:apply-templates/>
                </CEBFootnoteRef>
	</p>
	</xsl:if>


</xsl:for-each>
</font>
</div>
</xsl:template>

<xsl:template match="a:hi">
<xsl:choose>
<xsl:when test="@type='sub'">
<span><sub>
<xsl:apply-templates/>
</sub></span>
</xsl:when>
<xsl:when test="@type='super'">
<span><sup>
<xsl:apply-templates/>
</sup></span>
</xsl:when>
<xsl:when test="@type='underline'">
<span><u>
<xsl:apply-templates/>
</u></span>
</xsl:when>
<xsl:otherwise>
<span>
<xsl:attribute name="class"><xsl:value-of select="@type"/></xsl:attribute>
<xsl:apply-templates/>
</span>
</xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template match="a:divineName">
<xsl:choose>
<xsl:when test="@type='x-CEBLord'">
<span>
<xsl:attribute name="class"><xsl:value-of select="@type"/></xsl:attribute>
<xsl:apply-templates/>
</span>
</xsl:when>
<xsl:otherwise>
<xsl:apply-templates/>
</xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template match="a:lg">
<p/>
<ul id="ul{generate-id(.)}" onclick="javascript:func(this)">
<xsl:apply-templates/>
</ul>
</xsl:template>

<xsl:template match="a:l">
<li>
<xsl:attribute name="class"><xsl:value-of select="@type"/></xsl:attribute>
<xsl:apply-templates/>
</li>
</xsl:template>

<xsl:template match="a:lb">
<br/>
</xsl:template>

<!-- common matches END-->

<!-- <xsl:template match="*">
<xsl:apply-templates/>
</xsl:template> -->


</xsl:stylesheet><!-- Stylus Studio meta-information - (c) 2004-2007. Progress Software Corporation. All rights reserved.
<metaInformation>
<scenarios ><scenario default="yes" name="Scenario1" userelativepaths="yes" externalpreview="no" url="40-MATTHEWTP001.xml" htmlbaseurl="" outputurl="Song_of_SongsTP001_e.htm" processortype="internal" useresolver="no" profilemode="0" profiledepth="" profilelength="" urlprofilexml="" commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath="" postprocessgeneratedext="" validateoutput="no" validator="internal" customvalidator="" ><advancedProp name="sInitialMode" value=""/><advancedProp name="bXsltOneIsOkay" value="true"/><advancedProp name="bSchemaAware" value="false"/><advancedProp name="bXml11" value="false"/><advancedProp name="iValidation" value="0"/><advancedProp name="bExtensions" value="true"/><advancedProp name="iWhitespace" value="0"/><advancedProp name="sInitialTemplate" value=""/><advancedProp name="bTinyTree" value="true"/><advancedProp name="bWarnings" value="true"/><advancedProp name="bUseDTD" value="false"/><advancedProp name="iErrorHandling" value="fatal"/></scenario></scenarios><MapperMetaTag><MapperInfo srcSchemaPathIsRelative="yes" srcSchemaInterpretAsXML="no" destSchemaPath="" destSchemaRoot="" destSchemaPathIsRelative="yes" destSchemaInterpretAsXML="no"/><MapperBlockPosition></MapperBlockPosition><TemplateContext></TemplateContext><MapperFilter side="source"></MapperFilter></MapperMetaTag>
</metaInformation>
-->