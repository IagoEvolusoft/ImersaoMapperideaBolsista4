<map version="1.0.1">
<!-- To view this file, download free mind mapping software FreeMind from http://freemind.sourceforge.net -->
<node CREATED="1458224369712" ID="ID_118182200" LINK="mapas%20mentais.mm" MODIFIED="1638185086163" TEXT="git">
<node CREATED="1458224372614" MODIFIED="1458224373442" POSITION="right" TEXT="https://www.atlassian.com/git/tutorials/setting-up-a-repository"/>
<node CREATED="1466381787193" MODIFIED="1466381788380" POSITION="right" TEXT="https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging"/>
<node CREATED="1461241060646" ID="ID_1492663891" MODIFIED="1461241061728" POSITION="right" TEXT="tags">
<node CREATED="1461241063048" MODIFIED="1461241089999" TEXT="git clone">
<node CREATED="1461241090914" MODIFIED="1461241090914" TEXT="will give you the whole repository."/>
</node>
<node CREATED="1461241106082" MODIFIED="1461241106671" TEXT="git tag -l">
<node CREATED="1461241107446" MODIFIED="1461241108900" TEXT="listar"/>
</node>
<node CREATED="1461241072947" MODIFIED="1461241072947" TEXT="git checkout tags/&lt;tag_name&gt;">
<node CREATED="1461241110114" MODIFIED="1461241111629" TEXT="baixar"/>
</node>
<node CREATED="1461241080993" FOLDED="true" MODIFIED="1461241080993" TEXT="git checkout tags/&lt;tag_name&gt; -b &lt;branch_name&gt;">
<node CREATED="1461241112698" MODIFIED="1461241116879" TEXT="baixar e criar branch"/>
</node>
</node>
<node CREATED="1466381816347" ID="ID_1663708768" MODIFIED="1466381818088" POSITION="right" TEXT="branch">
<node CREATED="1466381840219" MODIFIED="1466381841627" TEXT="git branch -a"/>
<node CREATED="1466381842528" MODIFIED="1466381846098" TEXT="git fetch"/>
<node CREATED="1466381811708" MODIFIED="1466381812840" TEXT="git checkout BIRT_4_5_Branch"/>
<node CREATED="1528862769872" MODIFIED="1528862774540" TEXT="git checkout -b &lt;new-branch&gt;">
<node CREATED="1528862779393" MODIFIED="1528862794051" TEXT="Aqui serve pra criar um novo e ainda copia alteracoes feitas no corrente e nao commitadas"/>
</node>
</node>
<node CREATED="1473943129705" ID="ID_1242602227" MODIFIED="1473943131296" POSITION="right" TEXT="sign">
<node CREATED="1473943132112" MODIFIED="1473943132936" TEXT="git commit --amend --signoff"/>
</node>
<node CREATED="1473943152169" ID="ID_153556926" MODIFIED="1473943153327" POSITION="right" TEXT="proxy">
<node CREATED="1473943193793" MODIFIED="1473943195183" TEXT="ativar">
<node CREATED="1473943142020" ID="ID_1695660649" MODIFIED="1638211185648" TEXT="git config --global http.proxy http://clovis.wichoski:MinhaSenhaX@proxy.exemplo.com.br:3128"/>
</node>
<node CREATED="1473943195668" MODIFIED="1473943197702" TEXT="desativar">
<node CREATED="1473943201721" MODIFIED="1473943201721" TEXT="git config --global --unset http.proxy"/>
</node>
<node CREATED="1473943198091" MODIFIED="1473943199472" TEXT="verificar">
<node CREATED="1473943208829" MODIFIED="1473943208829" TEXT="git config --global --get http.proxy"/>
</node>
</node>
<node CREATED="1480213320453" FOLDED="true" MODIFIED="1480213322168" POSITION="right" TEXT="patch">
<node CREATED="1480213322755" MODIFIED="1480213322755" TEXT="653  git apply --stat 407.patch"/>
<node CREATED="1480213322756" MODIFIED="1480213322756" TEXT="654  git apply --check 407.patch"/>
<node CREATED="1480213322756" MODIFIED="1480213322756" TEXT="655  git apply  407.patch"/>
<node CREATED="1480213340146" MODIFIED="1480213342030" TEXT="https://patch-diff.githubusercontent.com/raw/wso2/carbon-dashboards/pull/407.patch"/>
</node>
<node CREATED="1490033788403" FOLDED="true" MODIFIED="1490033792157" POSITION="right" TEXT="clean">
<node CREATED="1490033797944" MODIFIED="1490033807387" TEXT="git clean -dn"/>
<node CREATED="1490033808039" MODIFIED="1490033809171" TEXT="git clean -df"/>
</node>
<node CREATED="1529027042670" FOLDED="true" MODIFIED="1529027064497" POSITION="right" TEXT="versionando">
<node CREATED="1498695011427" MODIFIED="1529027067952" TEXT="instalacoes">
<node CREATED="1498696036202" MODIFIED="1498696057695" TEXT="cd /opt/wso2is/producao"/>
<node CREATED="1498695015785" MODIFIED="1498695017758" TEXT="git init"/>
<node CREATED="1498695018365" MODIFIED="1498696026123" TEXT="echo &quot;repository/logs&quot; &gt; .gitignore"/>
<node CREATED="1498695992997" MODIFIED="1498695992997" TEXT="git add ."/>
<node CREATED="1498695992997" MODIFIED="1498696006627" TEXT="git config --global user.email &quot;clovis@neoinix.com.br&quot;"/>
<node CREATED="1498695992998" MODIFIED="1498695992998" TEXT="git config --global user.name &quot;cwichoski&quot;"/>
<node CREATED="1498695992998" MODIFIED="1498695992998" TEXT="git commit -m &quot;configuracao inicial&quot;"/>
<node CREATED="1500245068203" FOLDED="true" MODIFIED="1500245072367" TEXT="backupModified">
<node CREATED="1500245072833" MODIFIED="1500245076924" TEXT="#!/bin/sh&#xa;DIFF_FILE_PATH=&quot;./modified.txt&quot;&#xa;git status --porcelain | grep &quot; M &quot; | cut -d&quot; &quot; -f3 | grep -v &apos;^$&apos; | sort -u &gt; ${DIFF_FILE_PATH}&#xa;tar -p -cf diff-files.tar --files-from=${DIFF_FILE_PATH} --ignore-failed-read"/>
</node>
<node CREATED="1500247406019" FOLDED="true" MODIFIED="1500247408287" TEXT=".gitignore">
<node CREATED="1500247408979" MODIFIED="1500247413407" TEXT="repository/logs&#xa;*.log&#xa;*.lock&#xa;diff-files.tar&#xa;modified.txt&#xa;tmp"/>
</node>
</node>
</node>
<node CREATED="1532038374554" FOLDED="true" MODIFIED="1532038375746" POSITION="right" TEXT="merge">
<node CREATED="1532038376495" MODIFIED="1532038384826" TEXT="git clone git@bitbucket.org:zoome/zoomeapp.git"/>
<node CREATED="1532038376497" MODIFIED="1532038376497" TEXT="git status"/>
<node CREATED="1532038376497" MODIFIED="1532038376497" TEXT="git merge feature-firebase-series"/>
<node CREATED="1532038376498" MODIFIED="1532038376498" TEXT="git merge origin/feature-firebase-series"/>
<node CREATED="1532038376498" MODIFIED="1532038376498" TEXT="git status"/>
<node CREATED="1532038376498" MODIFIED="1532038376498" TEXT="git status"/>
<node CREATED="1532038376498" MODIFIED="1532038376498" TEXT="git add ZoomeProject/ZoomeMobile/ZoomeCore/Firebase/ApplicationData.qml"/>
<node CREATED="1532038376498" MODIFIED="1532038376498" TEXT="git status"/>
<node CREATED="1532038376498" MODIFIED="1532038376498" TEXT="git commit"/>
<node CREATED="1532038376498" MODIFIED="1532038376498" TEXT="git status"/>
<node CREATED="1532038376498" MODIFIED="1532038376498" TEXT="git push"/>
</node>
<node CREATED="1536159183050" FOLDED="true" MODIFIED="1536159192729" POSITION="right" TEXT="create branch from commit">
<node CREATED="1536159194304" MODIFIED="1536159197555" TEXT="git clone git@bitbucket.org:zoome/zoomeapp.git"/>
<node CREATED="1536159194305" MODIFIED="1536159194305" TEXT="git log"/>
<node CREATED="1536159194305" MODIFIED="1536159194305" TEXT="git checkout -b beforeNative 7edb367962effdf566787de1c83ad9e461179168"/>
<node CREATED="1536159194305" MODIFIED="1536159194305" TEXT="git push --set-upstream origin beforeNative"/>
</node>
<node CREATED="1602269545998" FOLDED="true" MODIFIED="1602269549697" POSITION="right" TEXT="remover submodulo">
<node CREATED="1602269550253" MODIFIED="1602269550253" TEXT="Delete the relevant section from the .gitmodules file."/>
<node CREATED="1602269550253" MODIFIED="1602269550253" TEXT="Stage the .gitmodules changes git add .gitmodules"/>
<node CREATED="1602269550254" MODIFIED="1602269550254" TEXT="Delete the relevant section from .git/config."/>
<node CREATED="1602269550254" MODIFIED="1602269550254" TEXT="Run git rm --cached path_to_submodule (no trailing slash)."/>
<node CREATED="1602269550254" MODIFIED="1602269550254" TEXT="Run rm -rf .git/modules/path_to_submodule (no trailing slash)."/>
<node CREATED="1602269550254" MODIFIED="1602269550254" TEXT="Commit git commit -m &quot;Removed submodule &quot;"/>
<node CREATED="1602269550254" MODIFIED="1602269550254" TEXT="Delete the now untracked submodule files rm -rf path_to_submodule"/>
</node>
<node CREATED="1541544703399" MODIFIED="1541544706339" POSITION="right" TEXT="remover pasta">
<node CREATED="1541544706942" MODIFIED="1541544707402" TEXT="git rm -r firebase_cpp_sdk"/>
</node>
<node CREATED="1548810209779" MODIFIED="1548810212111" POSITION="right" TEXT="adicao em lote">
<node CREATED="1548810212695" MODIFIED="1548810212695" TEXT="svn status | grep &quot;\?&quot; | cut -d&quot; &quot; -f8 | xargs svn add"/>
</node>
<node CREATED="1607368343215" FOLDED="true" MODIFIED="1607368345584" POSITION="right" TEXT="alias">
<node CREATED="1607368347277" MODIFIED="1607368371305" TEXT="git config --global --edit"/>
<node CREATED="1607368347277" MODIFIED="1607368376489" TEXT="git config --global core.editor code"/>
<node CREATED="1607368347277" MODIFIED="1607368380496" TEXT="git config --global --edit"/>
<node CREATED="1607368425187" MODIFIED="1607368428030" TEXT="tipos commit">
<node CREATED="1607368428500" MODIFIED="1607368428500" TEXT="feat"/>
<node CREATED="1607368428501" MODIFIED="1607368428501" TEXT="fix"/>
<node CREATED="1607368428501" MODIFIED="1607368428501" TEXT="test"/>
<node CREATED="1607368428501" MODIFIED="1607368428501" TEXT="chore"/>
<node CREATED="1607368428501" MODIFIED="1607368428501" TEXT="docs"/>
</node>
<node CREATED="1607368473912" MODIFIED="1607368473912" TEXT="[core]">
<node CREATED="1607368473912" MODIFIED="1607368473912" TEXT="editor = code --wait"/>
</node>
<node CREATED="1607368466560" MODIFIED="1607368466560" TEXT="[push]">
<node CREATED="1607368466561" MODIFIED="1607368466561" TEXT="followTags = true"/>
</node>
<node CREATED="1607368457582" MODIFIED="1607368457582" TEXT="[alias]">
<node CREATED="1607368457582" MODIFIED="1607368457582" TEXT="c = !git add --all &amp;&amp; git commit -m"/>
<node CREATED="1607368457583" MODIFIED="1607368457583" TEXT="s = !git status -s"/>
<node CREATED="1607368457583" MODIFIED="1607368457583" TEXT="l = !git log --pretty=format:&apos;%C(blue)%h%C(red)%d %C(white)%s - %C(cyan)%cn, %C(green)%cr&apos;"/>
<node CREATED="1607368457583" MODIFIED="1607368457583" TEXT="amend = !git add --all &amp;&amp; git commit --amend --no-edit"/>
<node CREATED="1607368457584" MODIFIED="1607368457584" TEXT="count = !git shortlog -s --grep"/>
</node>
</node>
</node>
</map>
