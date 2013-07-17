
<div class="navbar">
	<div class="navbar-inner">
		<div class="container" style="width: auto;">
			<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</a>
			<a class="brand" href="#">Cloud Launch Guide</a>
			<div class="nav-collapse">
				<ul class="nav pull-right">
					<li class="dropdown active">
						<a href="#" class="dropdown-toggle">Guides  <b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a ng-click="catalogue.newGuide()">New Guide</a></li>
							<li class="divider"></li>
							<li class="nav-header">All Guides</li>
							<li ng-repeat="guide in catalogue.guides"><a href="#/{{$index}}">{{guide.title}}</a></li>
						</ul>
					</li>
					<li><a href="#/content">Content</a></li>
				</ul>

			</div><!-- /.nav-collapse -->
		</div>
	</div><!-- /navbar-inner -->
</div>