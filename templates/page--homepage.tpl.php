<?php
/**
custom template page for /homepage
 */
?>

<div id="homepage" class="homepage">
	
	<div class="background-img"><img src="/sites/all/themes/volstate/img/menu_background.jpg" alt=""></div>
	
	<div id="menu-banner">
		<div class="col-md-6">
			<div id="weather"></div>
		</div>
		<div class="col-md-6">
			<div id="clock"></div>
		</div>
	</div>

	<div class="main-container <?php print $container_class; ?>">		
		  
		<div class="homepage-menu">
			
			<div class="row">
				<div class="col-md-6 text-center menu-item">
					<a href="/events" id="events-link">
						<div class="inside">
						<i class="fa fa-calendar fa-5x" aria-hidden="true"></i>
						<p>Events</p>
						</div>
					</a>
				</div>
				<div class="col-md-6 text-center menu-item">
					<a href="/directory" id="people-link">
						<div class="inside">
						<i class="fa fa-user-circle-o fa-5x" aria-hidden="true"></i>
						<p>People Finder</p>
						</div>
					</a>
				</div>
			</div> <!-- row 1 -->
			
			<div class="row">
				<div class="col-md-6 text-center menu-item">
					<a href="/map" id="map-link">
						<div class="inside">
						<i class="fa fa-map-marker fa-5x" aria-hidden="true"></i>
						<p>Campus Map</p>
						</div>
					</a>
				</div>
				<div class="col-md-6 text-center menu-item">
					<a href="/how-do-i" id="student-link">
						<div class="inside">
						<i class="fa fa-question fa-5x" aria-hidden="true"></i>
						<p>I'm Looking For...</p>
						</div>
					</a>
				</div>
			</div> <!-- row 2 -->
		
		</div> <!-- homepage-menu -->
		
		<!-- floating nav menu -->
		<?php include 'nav-menu-links.php'; ?>
		
			
	</div> <!-- main-container -->
	

</div> <!-- homepage-img -->





